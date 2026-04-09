const mongoose = require("mongoose");

const galleryPhotoSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: [true, "Photo URL is required"],
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        caption: {
            type: String,
            default: "",
        },
        isPublic: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("GalleryPhoto", galleryPhotoSchema);
