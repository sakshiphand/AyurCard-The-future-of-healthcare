import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  aadhaar: {
    type: String,
    required: true,
    validate: {
      validator: v => /^\d{12}$/.test(v),
      message: props => `${props.value} is not a valid Aadhaar number!`
    }
  },
  doctorId: { type: String, default: "" }, // optional for manual doctor entry
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);