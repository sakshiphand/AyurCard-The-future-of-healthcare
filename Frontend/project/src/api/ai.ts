import axios from "axios";

const API_URL = "http://localhost:8000";

export const getSymptoms = async () => {
  const res = await axios.get(`${API_URL}/symptoms`);
  return res.data;
};

export const analyzeHealth = async (symptom: string) => {

  const res = await axios.post(`${API_URL}/analyze`, {
    symptoms: symptom
  });

  return res.data;
};