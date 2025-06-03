import pandas as pd
import numpy as np
import pickle
import os
from flask import Flask, jsonify, request, abort, send_from_directory

app = Flask(__name__)
app.config["DEBUG"] = True

print("El fichero que se está ejecutando es:")
print(__file__)

root_path = "/api/api_model.py"

@app.route('/v1/predictCategory', methods=['GET'])
def predict():
    request_text = request.args.get('request_text')

    if None in request_text:
        return jsonify({"error": "No parameters"}), 400

    catDict = { 0 : "Copy Revision", 1 : "Design Issues", 2 : "Requested Change", 3 : "New Item"}
    rndNumber = np.random.randint(0,4)

    prediction = {"Categoría": catDict[rndNumber]}
    return jsonify({'predictions': prediction[0]})

@app.route('/v1/predictPriority', methods=['GET'])
def predict():
    request_text = request.args.get('request_text')

    if None in request_text:
        return jsonify({"error": "No parameters"}), 400

    prioDict = { 0 : "Low", 1 : "Medium", 2 : "High", 3: "Urgent"}
    rndNumber = np.random.randint(0,3)

    prediction = {"Prioridad": prioDict[rndNumber]}
    return jsonify({'predictions': prediction[0]})

@app.route('/v1/predicDuration', methods=['GET'])
def predict():
    request_text = request.args.get('request_text')

    if None in request_text:
        return jsonify({"error": "No parameters"}), 400

    prediction = {"Duration": np.random.choice([1, 2, 3, 5, 8, 13])}
    return jsonify({'predictions': prediction[0]})