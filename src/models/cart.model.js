'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'db_Carts';

// Declare the Schema of the Mongo model
var CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
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
            unique: true,
        },
        // discount_price: {
        //     type: Number,
        //     required: true,
        //     unique: true,
        // },
        // price: {
        //     type: Number,
        //     required: true,
        //     unique: true,
        // }
    }]
}, {
    timestamps: true,              // Tự động thêm createdAt và updatedAt
    collection: COLLECTION_NAME  // Tên collection trong MongoDB
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, CartSchema);