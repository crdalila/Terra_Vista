import os
import warnings
import numpy as np
import pickle
import joblib
from flask import Flask, jsonify, request

warnings.filterwarnings("ignore")

app = Flask(__name__)
app.config["DEBUG"] = True

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models')

# Funciones para cargar modelos
def load_model_bundle(filename):
    """Carga modelo + label encoder (clasificación codificada)"""
    path = os.path.join(MODEL_DIR, filename)
    with open(path, 'rb') as f:
        bundle = pickle.load(f)
        return bundle["model"], bundle["label_encoder"]

def load_model_only(filename):
    """Carga modelo sin encoder (clasificación sin codificar o regresión)"""
    path = os.path.join(MODEL_DIR, filename)
    with open(path, 'rb') as f:
        return pickle.load(f)

# Cargar modelos
try:
    category_model, category_encoder = load_model_bundle('category_classifier.pkl')
    priority_model = load_model_only('priority_classifier.pkl')
    duration_model_bundle = joblib.load(os.path.join(MODEL_DIR, 'model_duracion.pkl'))
    duration_model = duration_model_bundle["model"]
    duration_vectorizer = duration_model_bundle["vectorizer"]
except Exception as e:
    print("Error al cargar modelos:", e)
    raise

# Categoría (con encoder)
@app.route('/v1/predictCategory', methods=['GET'])
def predict_category():
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "No parameters"}), 400

    try:
        pred_encoded = category_model.predict([request_text])[0]
        pred = category_encoder.inverse_transform([pred_encoded])[0]
        return jsonify({"Categoría": str(pred)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Prioridad (sin encoder)
@app.route('/v1/predictPriority', methods=['GET'])
def predict_priority():
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "No parameters"}), 400

    try:
        pred = priority_model.predict([request_text])[0]
        return jsonify({"Prioridad": str(pred)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

category_list = ['Copy Revision', 'Design Issues', 'Requested Change', 'New Item']

# Duración (regresión)
@app.route('/v1/predictDuration', methods=['GET'])
def predict_duration():
    # request_text = request.args.get('request_text')
    # if not request_text:
    #     return jsonify({"error": "No parameters"}), 400

    # try:        
    #     X_vect = duration_vectorizer.transform([request_text])
    #     pred = duration_model.predict(X_vect)[0]
    #     return jsonify({"Duration": round(float(pred), 2)})
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "Missing request_text"}), 400

    # 1. Predecir categoría
    cat_pred_encoded = category_model.predict([request_text])[0]
    
    # Si el modelo devuelve codificado, hay que decodificar:
    # Por ejemplo si usaste LabelEncoder:
    category_pred = category_encoder.inverse_transform([cat_pred_encoded])[0]  # le es el LabelEncoder cargado

    # 2. Crear variables dummy
    type_dummy = np.zeros((1, len(category_list)))
    if category_pred in category_list:
        idx = category_list.index(category_pred)
        type_dummy[0, idx] = 1
    else:
        return jsonify({"error": f"Predicted category '{category_pred}' not in known categories"}), 400

    # 3. Vectorizar texto
    text_vec = duration_vectorizer.transform([request_text])

    # 4. Concatenar
    from scipy.sparse import hstack
    X_combined = hstack([text_vec, type_dummy])

    # 5. Predecir duración
    pred_duration = duration_model.predict(X_combined)[0]
    return jsonify({"Duration": float(pred_duration)})

if __name__ == '__main__':
    app.run()
