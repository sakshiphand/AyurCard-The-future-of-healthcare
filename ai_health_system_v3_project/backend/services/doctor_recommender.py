
import pandas as pd

df = pd.read_csv("data/medical_records.csv")

def recommend_doctor(symptoms):

    matches = df[df["Symptoms"].str.contains(symptoms.split()[0],case=False)]

    if len(matches)>0:
        r = matches.iloc[0]
        return r["Doctor"], r["Specialty"]

    return "General Physician","General Medicine"
