import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import articleRoutes from "./routes/articleRoutes.js";

const app = express();
app.use(
  cors({
    origin:[
    "http://localhost:5173",
    "http://localhost:5174",
    "https://bv3-seven.vercel.app/"
  ],
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.use("/api/articles", articleRoutes);
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// 🔴 ADD THIS LOG
console.log("Mongo URI:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });



app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
