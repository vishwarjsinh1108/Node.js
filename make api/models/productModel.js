const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please provide product description'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide product price'],
        },
        category: {
            type: String,
            required: [true, 'Please provide product category'],
        },
        stock: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            default: 'no-image.jpg',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
