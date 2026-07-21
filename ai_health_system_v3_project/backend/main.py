from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from pydantic import BaseModel
import uvicorn

app = FastAPI()

# Enable CORS for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
df = pd.read_csv("medical_records.csv")

# Disease classification
ACUTE = [
    "Acute Appendicitis",
    "Acute Kidney Stone",
    "Pneumonia"
]

CHRONIC = [
    "Arthritis",
    "Hypothyroidism",
    "Migraine"
]

# Disease Information
DISEASE_INFO = {

    "Arthritis": {
        "description": "Arthritis is inflammation of joints causing pain and stiffness.",
        "advice": "Exercise regularly and maintain healthy weight."
    },

    "Migraine": {
        "description": "Migraine is a neurological condition causing severe headaches.",
        "advice": "Avoid stress and maintain proper sleep."
    },

    "Hypothyroidism": {
        "description": "Hypothyroidism occurs when thyroid gland does not produce enough hormones.",
        "advice": "Regular thyroid checkup required."
    },

    "Pneumonia": {
        "description": "Pneumonia is a lung infection.",
        "advice": "Take proper rest and consult pulmonologist."
    },

    "Acute Kidney Stone": {
        "description": "Kidney stones are hard mineral deposits.",
        "advice": "Drink more water and consult urologist."
    },

    "Acute Appendicitis": {
        "description": "Appendicitis is inflammation of appendix.",
        "advice": "Immediate medical attention required."
    }
}

class SymptomInput(BaseModel):
    symptoms: str


# Get symptoms for dropdown
@app.get("/symptoms")
def get_symptoms():
    symptoms = df["Symptoms"].dropna().unique().tolist()
    return {"symptoms": symptoms}


# AI Prediction API
@app.post("/analyze")
def analyze_health(data: SymptomInput):

    symptom = data.symptoms.lower()

    filtered = df[df["Symptoms"].str.lower().str.contains(symptom)]

    if filtered.empty:
        return {
            "prediction": "Unknown",
            "disease": "Not Found",
            "confidence": 0,
            "description": "No disease found",
            "advice": "Consult doctor",
            "doctors": []
        }

    disease = filtered["Disease"].value_counts().idxmax()

    count = filtered["Disease"].value_counts().max()

    confidence = round((count / len(filtered)) * 100, 2)

    # Acute / Chronic
    if disease in ACUTE:
        disease_type = "Acute"
    else:
        disease_type = "Chronic"

    info = DISEASE_INFO.get(disease, {})

    doctors = (
        filtered[["Doctor","Specialty","Fees","Status"]]
        .drop_duplicates()
        .head(5)
        .to_dict(orient="records")
    )

    return {

        "prediction": disease_type,
        "disease": disease,
        "confidence": confidence,
        "description": info.get("description","No description available"),
        "advice": info.get("advice","Consult doctor"),
        "doctors": doctors,

        "model_info":{
            "model":"AI Health Insight Model",
            "algorithm":"Symptom Similarity Matching",
            "dataset_size": len(df),
            "features_used":["Symptoms"],
            "target":"Disease Type Prediction"
        }
    }


# Run server using python main.py
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)