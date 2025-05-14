'use strict'

const mongoose = require('mongoose');

// Định nghĩa schema
const productColorSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    colorImage: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,              // Tự động thêm createdAt và updatedAt
    collection: 'db_product_colors'  // Tên collection trong MongoDB
});

// Export model
module.exports = mongoose.model('ProductColor', productColorSchema);