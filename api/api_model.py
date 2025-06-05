import os
import warnings
import pickle
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
warnings.filterwarnings("ignore")


app = Flask(__name__)
app.config["DEBUG"] = True

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models')

def load_model(filename):
    path = os.path.join(MODEL_DIR, filename)
    with open(path, 'rb') as file:
        return pickle.load(file)

try:
    category_model = load_model('category_model.pkl')
    priority_model = load_model('priority_model.pkl')
    duration_model = load_model('duration_model.pkl')
except Exception as e:
    print("Error al cargar los modelos:", e)
    raise

# Predicción de categoría
@app.route('/v1/predictCategory', methods=['GET'])
def predict_category():
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "No parameters"}), 400
    
    try:
        input_df = pd.DataFrame({'text': [request_text]})
        pred = category_model.predict(input_df)[0]
        prediction = {"Categoría": str(pred)}
        return jsonify({'predictions': prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Predicción de prioridad
@app.route('/v1/predictPriority', methods=['GET'])
def predict_priority():
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "No parameters"}), 400
    
    try:
        input_df = pd.DataFrame({'text': [request_text]})
        pred = priority_model.predict(input_df)[0]
        prediction = {"Prioridad": str(pred)}
        return jsonify({'predictions': prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Predicción de duración
@app.route('/v1/predictDuration', methods=['GET'])
def predict_duration():
    request_text = request.args.get('request_text')
    if not request_text:
        return jsonify({"error": "No parameters"}), 400

    try:
        input_df = pd.DataFrame({'text': [request_text]})
        pred = duration_model.predict(input_df)[0]
        prediction = {"Duration": int(pred)}
        return jsonify({'predictions': prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
