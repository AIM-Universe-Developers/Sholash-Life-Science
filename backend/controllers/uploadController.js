const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const GalleryPhoto = require("../models/GalleryPhoto");

// @desc    Upload user photo
// @route   POST /api/upload/user-photo
// @access  Public (or Private depending on requirements)
const uploadUserPhoto = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // req.file.path or req.file.secure_url depending on storage
    let imageUrl = req.file.path;
    
    // If using local storage, normalize the path for web access
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        // Adjust path to be relative to the uploads folder or use a public URL
        const fileName = path.basename(req.file.path);
        imageUrl = `/uploads/${fileName}`;
    } else {
        imageUrl = req.file.path;
    }

    // Save to Gallery
    try {
        await GalleryPhoto.create({
            url: imageUrl,
            productId: req.body.productId, // Optional: if passed from frontend
            userId: req.user ? req.user._id : null // Optional: if auth middleware is used
        });
    } catch (dbError) {
        console.error("Gallery DB Error:", dbError);
        // We still return the image URL even if saving to gallery DB fails
    }

    res.status(200).json({
        success: true,
        url: imageUrl
    });
};

// @desc    Get all gallery photos
// @route   GET /api/upload/gallery
// @access  Public
const getGalleryPhotos = async (req, res) => {
    try {
        const photos = await GalleryPhoto.find({ isPublic: true }).sort("-createdAt");
        res.status(200).json({
            success: true,
            count: photos.length,
            data: photos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching gallery photos",
            error: error.message
        });
    }
};

// @desc    Delete user photo
// @route   DELETE /api/upload/user-photo
// @access  Public/Private
const deleteUserPhoto = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, message: "No URL provided" });
    }

    try {
        if (process.env.CLOUDINARY_CLOUD_NAME && url.includes("cloudinary")) {
            // Delete from Cloudinary
            // Extract public_id from URL
            const parts = url.split("/");
            const fileNameWithExt = parts[parts.length - 1];
            const publicId = fileNameWithExt.split(".")[0];
            // Assuming the folder name from multer-storage-cloudinary is 'sholash-products'
            // We might need to be more precise depending on setup
            await cloudinary.uploader.destroy(`sholash-products/${publicId}`);
        } else {
            // Delete from local storage
            const fileName = path.basename(url);
            const filePath = path.join(__dirname, "../uploads", fileName);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Also delete from Gallery Database
        await GalleryPhoto.deleteOne({ url });

        res.status(200).json({
            success: true,
            message: "Photo deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting photo",
            error: error.message
        });
    }
};

module.exports = {
    uploadUserPhoto,
    deleteUserPhoto,
    getGalleryPhotos
};
