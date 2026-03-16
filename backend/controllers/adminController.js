const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

// ─── @desc   Get Dashboard Statistics
// ─── @route  GET /api/admin/dashboard
// ─── @access Private (Admin)
const getDashboardStats = async (req, res, next) => {
    try {
        const [
            totalUsers, 
            totalOrders, 
            totalProducts, 
            revenueData,
            categoryData,
            monthlyRevenueData
        ] = await Promise.all([
            User.countDocuments(),
            Order.countDocuments(),
            Product.countDocuments(),
            Order.aggregate([
                { $match: { paymentStatus: "paid" } },
                { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
            ]),
            // Data for "Sales by Category" Pie Chart
            Product.aggregate([
                { $group: { _id: "$category", count: { $sum: 1 } } },
                { $lookup: { from: "categories", localField: "_id", foreignField: "_id", as: "categoryDoc" } },
                { $unwind: { path: "$categoryDoc", preserveNullAndEmptyArrays: true } },
                { $project: { name: { $ifNull: ["$categoryDoc.name", "Uncategorized"] }, value: "$count" } }
            ]),
            // Data for "Revenue Overview" Line Chart (Last 6 months)
            Order.aggregate([
                { $match: { paymentStatus: "paid" } },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                        Revenue: { $sum: "$totalPrice" }
                    }
                },
                { $sort: { _id: 1 } },
                { $limit: 6 },
                {
                    $project: {
                        name: "$_id", // e.g. "2023-10"
                        Revenue: 1,
                        _id: 0
                    }
                }
            ])
        ]);

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

        // Recent 5 orders
        const recentOrders = await Order.find()
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
