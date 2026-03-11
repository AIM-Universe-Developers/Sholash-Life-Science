const multer = require("multer");
const path = require("path");

// ─── Storage: Memory (for Cloudinary) or Disk ────────────────────────────────
const storage = multer.memoryStorage();

// ─── File Filter: Images Only ─────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed (jpeg, jpg, png, webp, gif)"));
    }
};

// ─── Multer Config ────────────────────────────────────────────────────────────
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB per file
    },
});

// Convenience wrappers
const uploadSingle = (fieldName) => upload.single(fieldName);
const uploadMultiple = (fieldName, maxCount = 5) =>
    upload.array(fieldName, maxCount);

module.exports = { upload, uploadSingle, uploadMultiple };
