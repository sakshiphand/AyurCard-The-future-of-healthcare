import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";


dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("Database:", process.env.MONGO_URI);
  })
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
