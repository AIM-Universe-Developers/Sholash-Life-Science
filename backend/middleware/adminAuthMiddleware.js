const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Role = require("../models/Role");

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
            const admin = await Admin.findById(decoded.id).select("-password");
            
            if (!admin) {
                return res.status(401).json({
                    success: false,
                    message: "Admin account not found",
                });
            }

            if (!admin.isActive) {
                return res.status(403).json({
                    success: false,
                    message: "Your account has been deactivated",
                });
            }

            // Temporarily, if the admin schema hasn't been migrated to reference the Role model
            // we will simulate the Role population by finding the Role by 'name' matching admin.role
            // In a full implementation where Admin.role references Role ObjectId, we'd use .populate('role')
            const roleDoc = await Role.findOne({ name: admin.role }).populate('permissions');
            
            req.user = admin.toObject();
            if (roleDoc) {
                req.user.roleDetails = roleDoc;
                req.user.permissions = roleDoc.permissions.map(p => p.name);
            } else {
                 req.user.permissions = [];
            }

            next();
        } catch (error) {
            console.error(error);
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

// ─── Granular Permission Check ───────────────────────────────────────────────
const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        // Superadmins bypass permission checks
        if (req.user && req.user.role === "superadmin") {
            return next();
        }

        if (req.user && req.user.permissions && req.user.permissions.includes(requiredPermission)) {
            next();
        } else {
             res.status(403).json({
                success: false,
                message: `Access denied – requires permission: ${requiredPermission}`,
            });
        }
    };
};

module.exports = { protect, isAdmin, isSuperAdmin, checkPermission };
