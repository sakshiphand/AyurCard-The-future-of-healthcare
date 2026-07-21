import React, { useState } from "react";
import { X, FileText, AlertCircle } from "lucide-react";

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recordData: any) => void;
}

export default function AddRecordModal({
  isOpen,
  onClose,
  onSubmit,
}: AddRecordModalProps) {
  const [formData, setFormData] = useState({
    symptoms: "",
    description: "",
    severity: "mild",
    preferredSpecialization: "",
    appointmentType: "consultation",
    urgency: "normal",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.symptoms.trim())
      newErrors.symptoms = "Symptoms are required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // ✅ Get JWT token

      if (!token) {
        console.error("No authentication token found. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/records/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send JWT token
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Record saved:", data);

      if (data.success) {
        onSubmit(data.record); // Pass saved record to parent
      } else {
        console.error("Error:", data.error || "Unknown error");
      }

      setFormData({
        symptoms: "",
        description: "",
        severity: "mild",
        preferredSpecialization: "",
        appointmentType: "consultation",
        urgency: "normal",
        notes: "",
      });

      onClose();
    } catch (err) {
      console.error("Error adding record:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Add Medical Record
              </h2>
              <p className="text-sm text-gray-600">
                Create a new medical record and request consultation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Symptoms */}
          <div>
            <label
              htmlFor="symptoms"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Symptoms *
            </label>
            <input
              type="text"
              id="symptoms"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.symptoms ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="e.g., Headache, fever, cough..."
            />
            {errors.symptoms && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.symptoms}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Detailed Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                errors.description ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Please describe your symptoms in detail..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Severity & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="severity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Severity Level
              </label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="urgency"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Urgency
              </label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>

          {/* Specialization & Appointment Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="preferredSpecialization"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Preferred Specialization
              </label>
              <select
                id="preferredSpecialization"
                name="preferredSpecialization"
                value={formData.preferredSpecialization}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any Available Doctor</option>
                <option value="general">General Medicine</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="neurology">Neurology</option>
                <option value="psychiatry">Psychiatry</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="gynecology">Gynecology</option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="ent">ENT</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="appointmentType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Appointment Type
              </label>
              <select
                id="appointmentType"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="consultation">Consultation</option>
                <option value="follow-up">Follow-up</option>
                <option value="second-opinion">Second Opinion</option>
                <option value="prescription-refill">Prescription Refill</option>
              </select>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="Any additional information..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Saving..." : "Add Record & Request Consultation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
