const express = require("express");
const router = express.Router();
const { uploadUserPhoto, deleteUserPhoto, getGalleryPhotos } = require("../controllers/uploadController");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");

// Route for uploads
router.post("/user-photo", protect, uploadSingle("photo"), uploadUserPhoto);

// Route for fetching all gallery photos
router.get("/gallery", getGalleryPhotos);

// Route for deleting a photo
router.delete("/user-photo", deleteUserPhoto);

module.exports = router;
