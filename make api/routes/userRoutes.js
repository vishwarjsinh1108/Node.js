const express = require('express');
const router = express.Router();
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

router
    .route('/')
    .post(protect, authorize('admin'), createUser)
    .get(protect, getUsers);

router
    .route('/:id')
    .get(protect, getUserById)
    .put(protect, authorize('admin'), updateUser)
    .delete(protect, authorize('admin'), deleteUser);

module.exports = router;
