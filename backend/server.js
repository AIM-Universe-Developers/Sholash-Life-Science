const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// ─── Route Imports ────────────────────────────────────────────────────────────
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");

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

// ─── Static Files ─────────────────────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.json({ success: true, message: "Sholash Life Science API is running 🚀" });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/admin", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅  Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
