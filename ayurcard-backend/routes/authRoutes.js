console.log("AUTH ROUTES FILE LOADED");
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// 🔐 Aadhaar Validation Function
const isValidAadhaar = (aadhaar) => /^[0-9]{12}$/.test(aadhaar);

// 🟢 Register User
router.post("/register/user", async (req, res) => {
  console.log("REGISTER API HIT");
  console.log(req.body);
  const { name, aadhaar, password, age, gender, phone } = req.body;

  try {
    if (!isValidAadhaar(aadhaar)) {
      return res.status(400).json({ msg: "Invalid Aadhaar number" });
    }

    const existingUser = await User.findOne({ aadhaar });
    if (existingUser) {
      return res.status(400).json({ msg: "Aadhaar already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      aadhaar,
      password: hashedPassword,
      age,
      gender,
      phone
    });

    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// 🟢 Register Doctor
router.post("/register/doctor", async (req, res) => {
  const { name, aadhaar, password, specialization } = req.body;

  try {
    if (!isValidAadhaar(aadhaar)) {
      return res.status(400).json({ msg: "Invalid Aadhaar number" });
    }

    const existingDoctor = await Doctor.findOne({ aadhaar });
    if (existingDoctor) {
      return res.status(400).json({ msg: "Aadhaar already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new Doctor({
      name,
      aadhaar,
      password: hashedPassword,
      specialization,
    });

    await doctor.save();

    res.json({ msg: "Doctor registered successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// 🟢 Login (User + Doctor)
router.post("/login", async (req, res) => {
  const { aadhaar, password, role } = req.body;

  console.log("Login request body:", req.body);

  if (!aadhaar || !password || !role) {
    return res.status(400).json({ msg: "Please provide Aadhaar, password and role" });
  }

  if (!isValidAadhaar(aadhaar)) {
    return res.status(400).json({ msg: "Invalid Aadhaar number" });
  }

  try {
    const Model = role === "doctor" ? Doctor : User;

    const person = await Model.findOne({ aadhaar });

    if (!person) {
      return res.status(400).json({ msg: "No account found" });
    }

    const isMatch = await bcrypt.compare(password, person.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: person._id, role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token,
      role,
      id: person._id,
      name: person.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;