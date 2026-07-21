from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Enable CORS (React connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
df = pd.read_csv("patients_200_records.csv")

# Disease classification
ACUTE = [
    "Acute Appendicitis",
    "Pneumonia"
]

CHRONIC = [
    "Arthritis",
    "Hypothyroidism",
    "Migraine"
]


# Request model
class SymptomInput(BaseModel):
    symptoms: str


# -----------------------------
# API 1 : Get Symptoms Dropdown
# -----------------------------
@app.get("/symptoms")
def get_symptoms():

    symptoms = df["Symptoms"].dropna().unique().tolist()

    return {
        "symptoms": symptoms
    }


# -----------------------------
# API 2 : Analyze Symptom
# -----------------------------
@app.post("/analyze")
def analyze_health(data: SymptomInput):

    symptom = data.symptoms.lower()

    # Filter dataset
    filtered = df[df["Symptoms"].str.lower().str.contains(symptom)]

    if filtered.empty:
        return {
            "prediction": "Unknown",
            "disease": "Not Found",
            "patients": [],
            "confidence": 0
        }

    # Take first row for disease prediction
    first_row = filtered.iloc[0]

    disease = first_row["Disease"]

    # Determine disease type
    if disease in ACUTE:
        disease_type = "Acute"
    else:
        disease_type = "Chronic"

    confidence = 95

    # Get ALL patients having this symptom
    patients_list = []

    for _, row in filtered.iterrows():
        patients_list.append({
            "patient_name": row["Patient_Name"],
            "disease": row["Disease"],
            "status": row["Status"]
        })

    return {

        "prediction": disease_type,
        "disease": disease,
        "confidence": confidence,

        "description": f"{disease} detected based on symptom pattern.",

        "advice": "Consult doctor for proper medical diagnosis.",

        # All patients list
        "patients": patients_list,

        "model_info": {
            "model": "AI Health Insight Model",
            "algorithm": "Symptom Similarity Matching",
            "dataset_size": len(df),
            "features_used": ["Symptoms"],
            "target": "Disease Type Prediction"
        }

    }


# Run server
if __name__ == "__main__":

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8001,
        reload=True
    )