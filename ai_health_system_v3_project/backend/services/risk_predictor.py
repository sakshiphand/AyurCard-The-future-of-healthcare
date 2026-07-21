
import joblib
model = joblib.load("model/risk_model.pkl")

def predict_risk(symptoms):
    return model.predict([symptoms])[0]
