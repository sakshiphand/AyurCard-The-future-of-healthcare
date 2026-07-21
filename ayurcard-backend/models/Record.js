import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  symptoms: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, enum: ["mild", "moderate", "severe"], default: "mild" },
  preferredSpecialization: { type: String, default: "" },
  appointmentType: { type: String, default: "consultation" },
  urgency: { type: String, enum: ["normal", "urgent", "emergency"], default: "normal" },
  notes: { type: String, default: "" },
  diagnosis: { type: String, default: "Pending" },
  treatment: { type: String, default: "Pending" },
  aiAnalysis: { type: String, default: "Pending" },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Record", recordSchema);
