import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  symptoms: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ["mild", "moderate", "severe"], default: "mild" },
  preferredSpecialization: { type: String, default: "" },
  appointmentType: { type: String, default: "consultation" },
  urgency: { type: String, enum: ["normal", "urgent", "emergency"], default: "normal" },
  notes: { type: String, default: "" },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
