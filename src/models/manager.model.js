'use strict';

const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Manager';
const COLLECTION_NAME = 'db_managers';

const accessUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 150
    },
    account: {
        type: String,
        required: true,
        unique: true,   // Đảm bảo account là duy nhất
        sparse: true,   // Cho phép account có thể là null nhưng nếu có giá trị thì phải unique
    },
    password: {
        type: String,
        required: true,
    },
    roles: [{
        type: [String],
        required: true
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    verify: {  // Sử dụng kiểu Boolean trực tiếp
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,  // Tự động thêm createdAt và updatedAt
    collection: COLLECTION_NAME  // Tên collection trong MongoDB
});

module.exports = mongoose.model(DOCUMENT_NAME, accessUserSchema);
