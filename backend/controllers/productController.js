const Product = require("../models/Product");

// ─── @desc   Create a Product
// ─── @route  POST /api/products
// ─── @access Private (Admin)
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, stock, brand } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "name, description, price, and category are required",
            });
        }

        // If files were uploaded, use their paths (memory storage returns buffer)
        let images = [];
        if (req.files && req.files.length > 0) {
            // Map to filenames or Cloudinary URLs — placeholder strings here
            images = req.files.map(
                (f) => `uploads/${Date.now()}-${f.originalname}`
            );
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            brand,
            images,
        });

        res.status(201).json({
            success: true,
            message: "Product created",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// ─── @desc   Get All Products (with search, filter & pagination)
// ─── @route  GET /api/products
// ─── @access Public
const getAllProducts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Build query filters
        const filter = { isActive: true };

        if (req.query.category) filter.category = req.query.category;
        if (req.query.brand) filter.brand = { $regex: req.query.brand, $options: "i" };
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
        }
        if (req.query.search) {
            filter.$text = { $search: req.query.search };
        }

        // Sorting
        const sortOptions = {
            newest: { createdAt: -1 },
            oldest: { createdAt: 1 },
            "price-asc": { price: 1 },
            "price-desc": { price: -1 },
            rating: { rating: -1 },
        };
        const sort = sortOptions[req.query.sort] || { createdAt: -1 };

        const [products, total] = await Promise.all([
            Product.find(filter)
                .populate("category", "name")
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Product.countDocuments(filter),
        ]);

        res.status(200).json({
            success: true,
            message: "Products fetched",
            data: products,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
};

// ─── @desc   Get Product by ID
// ─── @route  GET /api/products/:id
// ─── @access Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name description")
            .populate({ path: "reviews", populate: { path: "user", select: "name" } });

        if (!product || !product.isActive) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// ─── @desc   Update Product
// ─── @route  PUT /api/products/:id
// ─── @access Private (Admin)
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Handle new image uploads
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(
                (f) => `uploads/${Date.now()}-${f.originalname}`
            );
            req.body.images = [...product.images, ...newImages];
        }

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate("category", "name");

        res.status(200).json({
            success: true,
            message: "Product updated",
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

// ─── @desc   Delete Product (soft delete)
// ─── @route  DELETE /api/products/:id
// ─── @access Private (Admin)
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Soft delete – keeps data for order history integrity
        product.isActive = false;
        await product.save();

        res.status(200).json({
            success: true,
            message: "Product deleted",
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
