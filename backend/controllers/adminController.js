const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// ─── @desc   Get Dashboard Statistics
// ─── @route  GET /api/admin/dashboard
// ─── @access Private (Admin)
const getDashboardStats = async (req, res, next) => {
    try {
        const { month, year } = req.query;
        
        // Define date range for the selected month/year
        // Default to current date if not provided
        const now = new Date();
        const targetYear = year ? parseInt(year) : now.getFullYear();
        const targetMonth = month ? parseInt(month) - 1 : now.getMonth(); // 0-indexed month

        const startDate = new Date(targetYear, targetMonth, 1);
        const endDate = new Date(targetYear, targetMonth + 1, 0, 23, 59, 59, 999);

        // Date filter for queries that should be month-specific
        const dateFilter = {
            createdAt: { $gte: startDate, $lte: endDate }
        };

        const [
            totalUsers, 
            totalOrders, 
            totalProducts, 
            revenueData,
            categoryData,
            monthlyRevenueData
        ] = await Promise.all([
            User.countDocuments(dateFilter),
            Order.countDocuments(dateFilter),
            Product.countDocuments(), // Total products shouldn't be filtered by date usually
            Order.aggregate([
                { $match: { ...dateFilter, paymentStatus: "paid" } },
                { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
            ]),
            // Data for "Sales by Category" Pie Chart
            Order.aggregate([
                { $match: { ...dateFilter, paymentStatus: "paid" } },
                { $unwind: "$orderItems" }, // Assume orderItems exists based on standard patterns, or check schema
                { $lookup: { from: "products", localField: "orderItems.product", foreignField: "_id", as: "productDetail" } },
                { $unwind: "$productDetail" },
                { $group: { _id: "$productDetail.category", count: { $sum: "$orderItems.quantity" } } },
                { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "categoryDoc" } },
                { $unwind: { path: "$categoryDoc", preserveNullAndEmptyArrays: true } },
                { $project: { name: { $ifNull: ["$categoryDoc.name", "Uncategorized"] }, value: "$count" } }
            ]),
            // Data for "Revenue Overview" Line Chart (Daily for the selected month)
            Order.aggregate([
                { $match: { ...dateFilter, paymentStatus: "paid" } },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        Revenue: { $sum: "$totalPrice" }
                    }
                },
                { $sort: { _id: 1 } },
                {
                    $project: {
                        name: "$_id",
                        Revenue: 1,
                        _id: 0
                    }
                }
            ])
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Recent 5 orders within this range
        const recentOrders = await Order.find(dateFilter)
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            message: "Dashboard stats fetched",
            data: {
                totalUsers,
                totalOrders,
                totalProducts,
                totalRevenue,
                recentOrders,
                selectedPeriod: {
                    month: targetMonth + 1,
                    year: targetYear,
                    name: startDate.toLocaleString('default', { month: 'long' })
                },
                charts: {
                    salesByCategory: categoryData,
                    revenueOverview: monthlyRevenueData
                }
            },
        });
    } catch (error) {
        next(error);
    }
};

// ─── @desc   Get All Users (Paginated)
// ─── @route  GET /api/admin/users
// ─── @access Private (Admin)
const getUsers = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find()
                .select("-password")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            User.countDocuments(),
        ]);

        res.status(200).json({
            success: true,
            message: "Users fetched",
            data: users,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

// ─── @desc   Delete a User
// ─── @route  DELETE /api/admin/users/:id
// ─── @access Private (SuperAdmin)
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

// ─── @desc   Block / Unblock a User
// ─── @route  PUT /api/admin/users/block/:id
// ─── @access Private (Admin)
const blockUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.isActive ? "unblocked" : "blocked"} successfully`,
            data: { _id: user._id, name: user.name, isActive: user.isActive },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDashboardStats, getUsers, deleteUser, blockUser };
