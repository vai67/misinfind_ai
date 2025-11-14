from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

pac = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error" : "no text provided"}), 400
    
    vec = vectorizer.transform([text])
    pred = pac.predict(vec)[0]

    return jsonify({"prediction" : pred})

@app.route("/", methods=["GET"])
def home():
    return "Fake News Detector API is running!"

if __name__ == "__main__":
    app.run(debug=True)