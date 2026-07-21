import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { Brain } from "lucide-react";

export default function AIInsight() {

  const [aadhaar, setAadhaar] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 NEW: summary
  const [summary, setSummary] = useState("");

  // 🔷 Fetch CSV + MongoDB Data
  const fetchHistory = async () => {

    if (!aadhaar) {
      alert("Please enter Aadhaar");
      return;
    }

    setLoading(true);
    setHistory([]);
    setSummary("");

    try {

      const [csvRes, mongoRes] = await Promise.all([
        fetch("http://127.0.0.1:5000/get_history"),
        fetch(`http://127.0.0.1:5000/get_all_records?aadhaar=${aadhaar}`)
      ]);

      const csvData = csvRes.ok ? await csvRes.json() : [];
      const mongoData = mongoRes.ok ? await mongoRes.json() : [];

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

      combined.sort((a, b) => new Date(b.date) - new Date(a.date));

      setHistory(combined);

      // 🔥 Generate AI Summary
      if (combined.length > 0) {

        const count = {};
        combined.forEach((item) => {
          const d = item.disease.toLowerCase();
          count[d] = (count[d] || 0) + 1;
        });

        const topDisease = Object.keys(count).reduce((a, b) =>
          count[a] > count[b] ? a : b
        );

        const chronicList = ["diabetes", "hypertension", "asthma"];

        const type =
          chronicList.includes(topDisease) || count[topDisease] >= 3
            ? "Chronic"
            : "Acute";

        setSummary(
          `Most frequent disease: ${topDisease.toUpperCase()} (${type})`
        );
      }

    } catch (error) {
      console.error(error);
      alert("Failed to fetch data ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Brain className="text-blue-600" size={30}/>
          <h1 className="text-2xl font-bold">Patient Medical History</h1>
        </div>

        {/* Aadhaar Input */}
        <Card title="Search Patient">

          <div className="flex gap-4">

            <input
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              placeholder="Enter Aadhaar Number"
              className="border p-2 rounded w-72"
            />

            <button
              onClick={fetchHistory}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Fetch History
            </button>

          </div>

        </Card>

        {/* 🔥 AI SUMMARY */}
        {summary && (
          <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded">
            <p className="font-semibold text-blue-800">
              🧠 AI Insight: {summary}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center mt-6">
            <Brain className="animate-pulse text-blue-600 mx-auto" size={40}/>
            <p className="mt-2">Loading medical history...</p>
          </div>
        )}

        {/* Table */}
        {!loading && history.length > 0 && (
          <div className="mt-8">

            <Card title="Medical Records">

              <div className="overflow-x-auto">

                <table className="w-full text-left border">

                  <thead className="bg-gray-100">

                    <tr>
                      <th className="p-2">Date</th>
                      <th className="p-2">Doctor</th>
                      <th className="p-2">Symptoms</th>
                      <th className="p-2">Disease</th>
                      <th className="p-2">Treatment</th>
                      <th className="p-2">Fees</th>
                      <th className="p-2">Status</th>
                    </tr>

                  </thead>

                  <tbody>

                    {history.map((item, index) => (

                      <tr key={index} className="border-t hover:bg-gray-50">

                        <td className="p-2">{item.date}</td>
                        <td className="p-2">{item.doctor}</td>
                        <td className="p-2">{item.symptoms}</td>
                        <td className="p-2 font-medium">{item.disease}</td>
                        <td className="p-2">{item.treatment}</td>
                        <td className="p-2">₹{item.fees}</td>
                        <td className="p-2">{item.status}</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </Card>

          </div>
        )}

        {/* Empty State */}
        {!loading && aadhaar && history.length === 0 && (
          <p className="mt-6 text-center text-gray-500">
            No records found for this Aadhaar
          </p>
        )}

      </div>
    </div>
  );
}