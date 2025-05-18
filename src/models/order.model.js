'use strict';

const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Order';
const COLLECTION_NAME = 'db_Orders';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    cartItem: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ProductColor',
        },
        size: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ProductSize',
        },
        quantity: {
            type: Number,
            required: true,
        },
        discount_price: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }],
    totalDiscountPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    shippingAddress: {
        address: {
            type: String,
            required: true,
            trim: true,
        },
        ward: {
            type: String,
            required: true,
            trim: true,
        },
        district: {
            type: String,
            required: true,
            trim: true,
        },
        province: {
            type: String,
            required: true,
            trim: true,
        }
    },
    note: {
        type: String,
        trim: true,
        default: '',
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, OrderSchema);
