import os
import sys
import warnings

# Configurar numpy antes de importarlo
os.environ['NUMPY_EXPERIMENTAL_ARRAY_FUNCTION'] = '0'
os.environ['OPENBLAS_NUM_THREADS'] = '1'

warnings.filterwarnings("ignore")

try:
    import numpy as np
    print(f"NumPy version: {np.__version__}")
except ImportError as e:
    print(f"Error importing numpy: {e}")
    sys.exit(1)

import pickle
import joblib
from flask import Flask, jsonify, request

app = Flask(__name__)
app.config["DEBUG"] = True

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models')

print(f"Base dir: {BASE_DIR}")
print(f"Model dir: {MODEL_DIR}")
print(f"Models exist: {os.path.exists(MODEL_DIR)}")
if os.path.exists(MODEL_DIR):
    print(f"Files in models: {os.listdir(MODEL_DIR)}")

# Functions to load models
def load_model_bundle(filename):
    """Loads model + label encoder (encoded classification)"""
    path = os.path.join(MODEL_DIR, filename)
    print(f"Loading bundle from: {path}")
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found: {path}")
    
    try:
        with open(path, 'rb') as f:
            bundle = pickle.load(f)
            return bundle["model"], bundle["label_encoder"]
    except Exception as e:
        print(f"Error loading bundle {filename}: {e}")
        # Intentar con joblib
        try:
            bundle = joblib.load(path)
            return bundle["model"], bundle["label_encoder"]
        except Exception as e2:
            print(f"Error loading with joblib {filename}: {e2}")
            raise e

def load_model_only(filename):
    """Loads model without encoder (non-encoded classification or regression)"""
    path = os.path.join(MODEL_DIR, filename)
    print(f"Loading model from: {path}")
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found: {path}")
    
    try:
        with open(path, 'rb') as f:
            return pickle.load(f)
    except Exception as e:
        print(f"Error loading model {filename}: {e}")
        # Intentar con joblib
        try:
            return joblib.load(path)
        except Exception as e2:
            print(f"Error loading with joblib {filename}: {e2}")
            raise e

# Initialize variables
category_model = None
category_encoder = None
priority_model = None
duration_model = None
duration_vectorizer = None

# Load models with error handling
try:
    print("Loading category model...")
    category_model, category_encoder = load_model_bundle('category_classifier.pkl')
    print("Category model loaded successfully")
except Exception as e:
    print(f"Warning: Could not load category model: {e}")

try:
    print("Loading priority model...")
    priority_model = load_model_only('priority_classifier.pkl')
    print("Priority model loaded successfully")
except Exception as e:
    print(f"Warning: Could not load priority model: {e}")

try:
    print("Loading duration model...")
    duration_model_bundle = joblib.load(os.path.join(MODEL_DIR, 'model_duracion.pkl'))
    duration_model = duration_model_bundle["model"]
    duration_vectorizer = duration_model_bundle["vectorizer"]
    print("Duration model loaded successfully")
except Exception as e:
    print(f"Warning: Could not load duration model: {e}")

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    status = {
        "status": "running",
        "models": {
            "category": category_model is not None,
            "priority": priority_model is not None,
            "duration": duration_model is not None
        }
    }
    return jsonify(status)

# Category(with encoder)
@app.route('/v1/predictCategory', methods=['GET'])
def predict_category():
    if category_model is None:
        return jsonify({"error": "Category model not loaded"}), 500
    
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "No parameters"}), 400

    try:
        pred_encoded = category_model.predict([request_text])[0]
        pred = category_encoder.inverse_transform([pred_encoded])[0]
        return jsonify({"Category": str(pred)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Priority (without encoder)
@app.route('/v1/predictPriority', methods=['GET'])
def predict_priority():
    if priority_model is None:
        return jsonify({"error": "Priority model not loaded"}), 500
    
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "No parameters"}), 400

    try:
        pred = priority_model.predict([request_text])[0]
        return jsonify({"Priority": str(pred)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

category_list = ['Copy Revision', 'Design Issues', 'Requested Change', 'New Item']

# Duration (regression)
@app.route('/v1/predictDuration', methods=['GET'])
def predict_duration():
    if duration_model is None or duration_vectorizer is None or category_model is None:
        return jsonify({"error": "Required models not loaded"}), 500
    
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "Missing request_text"}), 400

    try:
        # 1. Predict category
        cat_pred_encoded = category_model.predict([request_text])[0]
        category_pred = category_encoder.inverse_transform([cat_pred_encoded])[0]

        # 2. Create dummy variables
        type_dummy = np.zeros((1, len(category_list)))
        if category_pred in category_list:
            idx = category_list.index(category_pred)
            type_dummy[0, idx] = 1
        else:
            return jsonify({"error": f"Predicted category '{category_pred}' not in known categories"}), 400

        # 3. Vectorize text
        text_vec = duration_vectorizer.transform([request_text])

        # 4. Concatenate
        from scipy.sparse import hstack
        X_combined = hstack([text_vec, type_dummy])

        # 5. Predict duration
        pred_duration = duration_model.predict(X_combined)[0]
        return jsonify({"Duration": float(pred_duration)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask app...")
    app.run(host='0.0.0.0', port=5000, debug=True)