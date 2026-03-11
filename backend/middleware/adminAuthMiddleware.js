const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// ─── Protect: Verify JWT & Attach Admin to Request ───────────────────────────
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach admin doc (without password) to req
            req.user = await Admin.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Admin account not found",
                });
            }

            if (!req.user.isActive) {
                return res.status(403).json({
                    success: false,
                    message: "Your account has been deactivated",
                });
            }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Not authorized – token invalid or expired",
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "Not authorized – no token provided",
        });
    }
};

// ─── Admin Check: Requires Admin Role ────────────────────────────────────────
const isAdmin = (req, res, next) => {
    if (req.user && (req.user.role === "admin" || req.user.role === "superadmin")) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied – admins only",
        });
    }
};

// ─── Superadmin Check ─────────────────────────────────────────────────────────
const isSuperAdmin = (req, res, next) => {
    if (req.user && req.user.role === "superadmin") {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Access denied – superadmins only",
        });
    }
};

module.exports = { protect, isAdmin, isSuperAdmin };
