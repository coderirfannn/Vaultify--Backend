import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

// route imports
import authRoutes from "./routes/authRoutes.js";
import billRoutes from "./routes/billRoutes.js";

// env config
dotenv.config();

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// db connection
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);

// default route
app.get("/", (req, res) => {
  res.send("✅ Warranty Vault Backend is running...");
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
