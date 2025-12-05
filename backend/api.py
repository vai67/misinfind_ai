# backend/api.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:3000",
                                   "http://127.0.0.1:3000"]}},
    supports_credentials=False
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
VECT_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")

pac = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECT_PATH)


@app.route("/analyze", methods=["POST", "OPTIONS"])
def analyze():
    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()
    print("Received data:", data)

    text = (data or {}).get("text", "")
    if not text.strip():
        return jsonify({"error": "no text provided"}), 400

    vec = vectorizer.transform([text])
    pred = pac.predict(vec)[0]
    print("Prediction:", pred)

    return jsonify({"prediction": pred})


@app.route("/", methods=["GET"])
def home():
    return "Fake News Detector API is running!"

def _run_self_tests():
    '''
    Basic self-tests to verify the API functionality.
    '''
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import PassiveAggressiveClassifier

    assert isinstance(vectorizer, TfidfVectorizer), "Vectorizer is not TfidfVectorizer" 
    assert isinstance(pac, PassiveAggressiveClassifier), "Model is not PassiveAggressiveClassifier"
    assert hasattr(pac, "classes_"), "Model does not have 'classes_' attribute"
    assert len(pac.classes_) >= 1, "Model has no classes"

    with app.test_client() as client:
        resp = client.get("/")
        assert resp.status_code == 200, "Home endpoint failed"
        assert resp.status_code == 200, "Home endpoint did not return 200 OK"

        resp = client.post("/analyze", json={"text": "Breaking news: something happened!"})
        data = resp.get_json()
        assert isinstance(data, dict), "Response is not a JSON object"
        assert "prediction" in data, "'prediction' not in response"

        resp = client.post("/analyze", json={"text": "   "})
        assert resp.status_code == 400, "Empty text did not return 400 error"
        data = resp.get_json()
        assert "error" in data, "'error' not in response for empty text"
    print("✅ All API self-tests passed.")

if __name__ == "__main__":
    _run_self_tests()  
    app.run(debug=True)






# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib

# app = Flask(__name__)
# CORS(app, origins=["http://127.0.0.1:3000"], supports_credentials=True)

# pac = joblib.load("model.pkl")
# vectorizer = joblib.load("vectorizer.pkl")

# @app.route("/analyze", methods=["POST"])
# def analyze():
    
#     data = request.get_json()
#     print("Received data: ", data)
#     text = data.get("text", "")

#     if not text.strip():
#         return jsonify({"error" : "no text provided"}), 400
    
#     vec = vectorizer.transform([text])
#     pred = pac.predict(vec)[0]

#     print("Prediction: ", pred)
#     return jsonify({"prediction" : pred})

# @app.route("/", methods=["GET"])
# def home():
#     return "Fake News Detector API is running!"

# if __name__ == "__main__":
#     app.run(debug=True)