import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },

  aadhaar: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[0-9]{12}$/, "Invalid Aadhaar number"], // ✅ validation
  },

  password: { type: String, required: true },

  specialization: { type: String, required: true },

  patients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
});


// 🔐 Optional: Mask Aadhaar before sending
doctorSchema.methods.getMaskedAadhaar = function () {
  return "XXXX-XXXX-" + this.aadhaar.slice(-4);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;