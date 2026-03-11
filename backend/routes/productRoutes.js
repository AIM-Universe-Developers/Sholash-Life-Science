const express = require("express");
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/adminAuthMiddleware");
const { uploadMultiple } = require("../middleware/uploadMiddleware");

// Public
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected (Admin)
router.post(
    "/",
    protect,
    isAdmin,
    uploadMultiple("images", 5),
    createProduct
);
router.put(
    "/:id",
    protect,
    isAdmin,
    uploadMultiple("images", 5),
    updateProduct
);
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
