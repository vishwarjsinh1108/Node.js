const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Total Revenue
        const orders = await Order.find({ status: 'delivered' });
        const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);

        // Recent Activity (Last 5 orders)
        const recentOrders = await Order.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .limit(5);

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue,
            recentOrders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
