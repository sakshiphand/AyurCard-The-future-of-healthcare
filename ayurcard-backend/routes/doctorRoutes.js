import express from "express";
import protect from "../middleware/authMiddleware.js";
import Doctor from "../models/Doctor.js";
import Record from "../models/Record.js";

const router = express.Router();

// 🟢 Get Doctor Profile
router.get("/profile", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const doctor = await Doctor.findById(req.user.id);

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🟢 View All Patient Records
router.get("/patients", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const records = await Record.find({ doctor: req.user.id })
      .populate("user", "name aadhaar age gender"); // ✅ changed

    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🟢 Update Diagnosis/Treatment
router.put("/update-record/:id", protect, async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { diagnosis, treatment } = req.body;

    const record = await Record.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    record.diagnosis = diagnosis || record.diagnosis;
    record.treatment = treatment || record.treatment;
    record.doctor = req.user.id;

    await record.save();

    res.json({ msg: "Record updated successfully", record });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;