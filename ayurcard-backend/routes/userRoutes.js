import express from "express";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Record from "../models/Record.js";

const router = express.Router();

// 🟢 Get User Profile
router.get("/profile", protect, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const user = await User.findById(req.user.id).populate("medicalHistory");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🟢 Add Medical Record (symptoms entered by user)
router.post("/add-record", protect, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const { symptoms } = req.body;

    const record = new Record({
      user: req.user.id,
      symptoms,
      diagnosis: "Pending",   // Doctor will update
      treatment: "Pending",
      aiAnalysis: "Pending"
    });

    await record.save();

    // link record to user
    const user = await User.findById(req.user.id);
    user.medicalHistory.push(record._id);
    await user.save();

    res.json({ msg: "Record added successfully", record });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// 🟢 View All Medical Records
router.get("/records", protect, async (req, res) => {
  try {
    if (req.user.role !== "user") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const records = await Record.find({ user: req.user.id })
      .populate("doctor", "name specialization");

    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;  // ✅ ESM export

