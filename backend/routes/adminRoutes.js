const express = require("express");
const router = express.Router();
const {
    getDashboardStats,
    getUsers,
    deleteUser,
    blockUser,
} = require("../controllers/adminController");
const { protect, isAdmin, isSuperAdmin } = require("../middleware/adminAuthMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const { getRoles, createRole, getPermissions } = require("../controllers/roleController");

// All admin routes require authentication
router.use(protect);
router.use(isAdmin);

// Dashboard – any admin
router.get("/dashboard", getDashboardStats);

// User management
router.get("/users", getUsers);
router.put("/users/block/:id", blockUser);
router.delete("/users/:id", isSuperAdmin, deleteUser); // superadmin only

// Role and Permission management
router.get("/roles", getRoles);
router.post("/roles", isSuperAdmin, createRole);
router.get("/permissions", getPermissions);

module.exports = router;
