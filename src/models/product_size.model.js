'use strict'

const mongoose = require('mongoose');

// Định nghĩa schema
const productSizeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    unique: true,
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
  collection: 'db_product_sizes'  // Tên collection trong MongoDB
});

// Export model
module.exports = mongoose.model('ProductSize', productSizeSchema);
