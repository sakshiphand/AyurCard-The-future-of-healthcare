import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function AIInsightDr() {

  const [aadhaar, setAadhaar] = useState("");
  const [history, setHistory] = useState([]);
  const [prediction, setPrediction] = useState([]);
  const [loading, setLoading] = useState(false);

  const [symptoms, setSymptoms] = useState("");

  const [form, setForm] = useState({
    date: "",
    doctor: "",
    symptoms: "",
    disease: "",
    treatment: "",
    fees: "",
    status: "",
  });

  // 🔷 Fetch History
  const fetchHistory = async () => {

    if (!aadhaar) return alert("Enter Aadhaar");

    setLoading(true);

    try {

      const [csvRes, mongoRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/get_history"),
        fetch(
          `http://127.0.0.1:5000/get_all_records?aadhaar=${aadhaar}`
        )
      ]);

      const csvData = await csvRes.json();
      const mongoData = await mongoRes.json();

      const filteredCSV = csvData.filter(
        (item) => String(item.Aadhaar_No) === String(aadhaar)
      );

      const combined = [...filteredCSV, ...mongoData].map((item) => ({
        date: item.date || item.Date || "N/A",
        doctor: item.doctor || item.Doctor_Name || "N/A",
        symptoms: item.symptoms || item.Symptoms || "N/A",
        disease: item.disease || item.Disease || "N/A",
        treatment: item.treatment || item.Treatment || "N/A",
        fees: item.fees || item.Fees || 0,
        status: item.status || item.Status || "N/A",
      }));

      combined.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setHistory(combined);

    } catch (err) {

      console.error(err);
      alert("Error fetching data ❌");

    }

    setLoading(false);
  };

  // 🔥 Predict Disease
  const handlePredict = async () => {

    if (!aadhaar) return alert("Enter Aadhaar first");
    if (!symptoms) return alert("Enter symptoms");

    try {

      const symptomList = symptoms
        .split(",")
        .map((s) => s.trim().toLowerCase());

      const res = await fetch(
        "http://127.0.0.1:5000/predict_disease",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            aadhaar,
            symptoms: symptomList
          })
        }
      );

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      setPrediction(data.predictions);

      // 🔥 Autofill best disease
      if (data.predictions.length > 0) {

        setForm({
          ...form,
          symptoms: symptoms,
          disease: data.predictions[0].disease
        });

      }

    } catch (err) {

      console.error(err);
      alert("Prediction failed ❌");

    }
  };

  // 🔷 Handle Form
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // 🔷 Save Record
  const handleSubmit = async () => {

    if (!aadhaar) return alert("Enter Aadhaar first");

    try {

      await fetch(
        "http://127.0.0.1:5000/add_record",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...form,
            aadhaar
          })
        }
      );

      alert("Saved ✅");

      setForm({
        date: "",
        doctor: "",
        symptoms: "",
        disease: "",
        treatment: "",
        fees: "",
        status: "",
      });

      setPrediction([]);
      setSymptoms("");

      fetchHistory();

    } catch {

      alert("Save failed ❌");

    }
  };

  return (

    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* Aadhaar */}
        <Card title="Enter Aadhaar">

          <div className="flex gap-4">

            <input
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              placeholder="Enter Aadhaar"
              className="border p-2 rounded w-72"
            />

            <button
              onClick={fetchHistory}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Fetch History
            </button>

          </div>

        </Card>

        {/* History */}
        {history.length > 0 && (

          <Card title="Medical History">

            <table className="w-full text-left">

              <thead>
                <tr>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Symptoms</th>
                  <th>Disease</th>
                </tr>
              </thead>

              <tbody>

                {history.map((item, i) => (

                  <tr key={i} className="border-b">

                    <td className="py-2">{item.date}</td>
                    <td>{item.doctor}</td>
                    <td>{item.symptoms}</td>
                    <td>{item.disease}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </Card>

        )}

        {/* Prediction */}
        {history.length > 0 && (

          <Card title="Symptoms">

            <input
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter symptoms (fever, cough, headache)"
              className="border p-2 rounded w-full"
            />

            <button
              onClick={handlePredict}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Predict Disease
            </button>

            {/* 🔥 Top 3 Predictions */}
            {prediction.length > 0 && (

              <div className="mt-6 space-y-4">

                {prediction.map((item, index) => (

                  <div
                    key={index}
                    className="border rounded-lg p-4 bg-blue-50"
                  >

                    <h2 className="text-xl font-bold text-blue-700">
                      {index + 1}. {item.disease}
                    </h2>

                    <p className="text-gray-700">
                      Type: {item.type}
                    </p>

                    <p className="text-green-700 font-semibold">
                      Probability: {item.probability}%
                    </p>

                  </div>

                ))}

              </div>

            )}

          </Card>

        )}

        {/* Add Record */}
        {prediction.length > 0 && (

          <Card title="Add New Record">

            <div className="grid md:grid-cols-2 gap-4">

              <input
                name="date"
                value={form.date}
                placeholder="Date"
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="doctor"
                value={form.doctor}
                placeholder="Doctor"
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="symptoms"
                value={form.symptoms}
                placeholder="Symptoms"
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="disease"
                value={form.disease}
                placeholder="Disease"
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="treatment"
                value={form.treatment}
                placeholder="Treatment"
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="fees"
                value={form.fees}
                placeholder="Fees"
                onChange={handleChange}
                className="border p-2"
              />

              <input
                name="status"
                value={form.status}
                placeholder="Status"
                onChange={handleChange}
                className="border p-2"
              />

            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Save Record
            </button>

          </Card>

        )}

      </div>

    </div>

  );
}