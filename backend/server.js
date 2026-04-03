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

// ─── Trust Render's reverse proxy (required for rate-limit & IP detection) ────
app.set('trust proxy', 1);

// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
}));



const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://sholash-life-science-1.onrender.com',
];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin '${origin}' not allowed`));
        }
    },
    credentials: true,
}));

// Global rate limiter: 200 requests per 15 minutes per real IP
// trust proxy (set above) ensures req.ip is the real client IP on Render
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
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
app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Sholash Life Science API is running 🚀" });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/admin", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);

// ─── Serve Frontend ───────────────────────────────────────────────────────────
const frontendPath = path.join(__dirname, "../FrontEnd/dist");
app.use(express.static(frontendPath));

// Catch-all to serve index.html for any frontend routes (SPA)
app.get(/.*/, (req, res, next) => {
    // Skip API calls and static asset requests
    if (req.url.startsWith('/api') || req.url.match(/\.(js|css|png|jpg|jpeg|svg|ico|webp|woff|woff2|ttf|eot|map)$/)) {
        return next();
    }
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`✅  Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
