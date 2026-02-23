const express = require('express');
const router = express.Router();
const {
    getOrders,
    updateOrderStatus,
    deleteOrder,
} = require('../controllers/orderController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(protect, admin, getOrders);
router
    .route('/:id')
    .delete(protect, admin, deleteOrder);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;
