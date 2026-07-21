import React, { useEffect, useState } from "react";
import AddRecordModal from "../components/AddRecordModal";

export default function RecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch saved records from backend when page loads
  useEffect(() => {
    fetch("http://localhost:5000/api/records")
      .then((res) => res.json())
      .then((data) => setRecords(data))
      .catch((err) => console.error("Error fetching records:", err));
  }, []);

  const handleAddRecord = (newRecord: any) => {
    setRecords((prev) => [newRecord, ...prev]); // Add newly created record instantly
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Add Record
      </button>

      <AddRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRecord}
      />

      <div className="mt-6 space-y-3">
        {records.map((r, i) => (
          <div
            key={i}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <p><strong>Symptoms:</strong> {r.symptoms}</p>
            <p><strong>Description:</strong> {r.description}</p>
            <p><strong>Severity:</strong> {r.severity}</p>
            <p><strong>Status:</strong> {r.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
