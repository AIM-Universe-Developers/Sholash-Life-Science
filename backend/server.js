<<<<<<< HEAD
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// ─── Route Imports ────────────────────────────────────────────────────────────
const authRoutes     = require("./routes/authRoutes");
const adminRoutes    = require("./routes/adminRoutes");
const productRoutes  = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes    = require("./routes/orderRoutes");
const userRoutes     = require("./routes/userRoutes");

// ─── Database ─────────────────────────────────────────────────────────────────
connectDB();

// ─── App Init ─────────────────────────────────────────────────────────────────
const app = express();

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());

// Global rate limiter: 100 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests, please try again later." },
});
app.use(limiter);

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({ success: true, message: "Sholash Life Science API is running 🚀" });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/admin",      authRoutes);
app.use("/api/admin",      adminRoutes);
app.use("/api/products",   productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders",     orderRoutes);
app.use("/api/users",      userRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅  Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
=======
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
>>>>>>> d19f2668ad1c2c7e483807071a0bf0b2e052a2b2
});
