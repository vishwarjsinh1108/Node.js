const express = require('express');
const router = express.Router();
const {
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    createUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(protect, admin, getUsers).post(protect, admin, createUser);
router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

module.exports = router;
