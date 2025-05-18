'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'CodeDiscount';
const COLLECTION_NAME = 'db_codeDiscounts';

// Declare the Schema of the Mongo model
var codeDiscountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    discount_type: {
        type: String,
        enum: ['shipping', 'totalmoney'],
        required: true,
    },
    discount_value: {
        type: Number,
        required: true,
    },
    max_discount: {
        type: Number,
        default: null,
    },
    min_order_value: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
    },
    used_count: {
        type: Number,
        default: 0,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    applicable_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    available_quantity: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,              // Tự động thêm createdAt và updatedAt
    collection: COLLECTION_NAME  // Tên collection trong MongoDB
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, codeDiscountSchema);