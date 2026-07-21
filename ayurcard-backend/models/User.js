import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  aadhaar: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^[0-9]{12}$/, "Invalid Aadhaar number"], // ✅ validation
  },

  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number },

  gender: { type: String },

  medicalHistory: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Record" }
  ],
});

const User = mongoose.model("User", userSchema);

export default User;