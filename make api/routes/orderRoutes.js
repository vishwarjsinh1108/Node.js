const express = require('express');
const router = express.Router();
const {
    createOrder,
    getOrders,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(protect, getOrders).post(protect, createOrder);

router.route('/:id').delete(protect, authorize('admin'), deleteOrder);

router.route('/:id/status').put(protect, authorize('admin'), updateOrderStatus);

module.exports = router;
