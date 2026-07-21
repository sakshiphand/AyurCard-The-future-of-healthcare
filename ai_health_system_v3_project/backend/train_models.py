
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

df = pd.read_csv("data/medical_records.csv")

df["disease_type"] = df["Disease"].apply(
    lambda x: "acute" if "Acute" in x else "chronic"
)

def risk_rule(status):
    if status == "pending":
        return "high"
    elif status == "ongoing":
        return "medium"
    else:
        return "low"

df["risk"] = df["Status"].apply(risk_rule)

X = df["Symptoms"]

disease_model = Pipeline([
    ("vectorizer",TfidfVectorizer()),
    ("classifier",RandomForestClassifier())
])

risk_model = Pipeline([
    ("vectorizer",TfidfVectorizer()),
    ("classifier",RandomForestClassifier())
])

disease_model.fit(X,df["disease_type"])
risk_model.fit(X,df["risk"])

os.makedirs("model",exist_ok=True)

joblib.dump(disease_model,"model/disease_model.pkl")
joblib.dump(risk_model,"model/risk_model.pkl")

print("Models trained successfully")
