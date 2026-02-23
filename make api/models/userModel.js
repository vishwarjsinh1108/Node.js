const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide user name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
            unique: true,
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
