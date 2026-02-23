const express = require('express');
const router = express.Router();
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router
    .route('/')
    .get(getProducts)
    .post(protect, authorize('admin'), upload.single('image'), createProduct);

router
    .route('/:id')
    .get(getProductById)
    .put(protect, authorize('admin'), upload.single('image'), updateProduct)
    .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
