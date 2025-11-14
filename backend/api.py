from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

pac = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")