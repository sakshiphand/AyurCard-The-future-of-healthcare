
import joblib
model = joblib.load("model/disease_model.pkl")

def predict_disease(symptoms):
    pred = model.predict([symptoms])[0]
    conf = max(model.predict_proba([symptoms])[0])
    return pred, conf
