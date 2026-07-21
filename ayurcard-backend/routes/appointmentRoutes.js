import express from "express";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// ✅ Book Appointment
router.post("/book", async (req, res) => {
  try {
    const {
      patientName,
      age,
      gender,
      phone,
      aadhaar,
      doctorId,
      doctorName,
      date,
      time,
      reason,
    } = req.body;

    // Validate required fields
    if (!patientName || !age || !gender || !phone || !aadhaar || !doctorName || !date || !time || !reason) {
      return res.status(400).json({ msg: "Please fill all required fields" });
    }

    // Validate Aadhaar
    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({ msg: "Enter a valid 12-digit Aadhaar number" });
    }

    // Check duplicate appointment only if doctorId exists (selected from list)
    if (doctorId) {
      const existing = await Appointment.findOne({ doctorId, date, time });
      if (existing) {
        return res.status(400).json({ msg: "This time slot is already booked" });
      }
    }

    const appointment = new Appointment({
      patientName,
      age,
      gender,
      phone,
      aadhaar,
      doctorId: doctorId || "",
      doctorName,
      date,
      time,
      reason,
    });

    await appointment.save();
    res.status(201).json({ msg: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to book appointment", error: err.message });
  }
});

// ✅ Get All Appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch appointments", error: err.message });
  }
});

export default router;