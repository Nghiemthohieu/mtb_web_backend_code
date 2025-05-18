'use strict';
// models/ProductReview.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ManagerResponseSchema = new Schema({
  manager_id: {
    type: Schema.Types.ObjectId,
    ref: 'Manager', // hoặc 'Manager' nếu bạn có collection riêng
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
}, { _id: false }); // Không cần _id riêng cho response

const ProductReviewSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
  images: [{
    type: String, // URL hoặc đường dẫn ảnh
  }],
  response: {
    type: ManagerResponseSchema,
    default: null,
  },
}, {
  collection: 'go_db_product_reviews',
  timestamps: true, // vì bạn đã dùng create_at riêng
});

module.exports = mongoose.model('ProductReview', ProductReviewSchema);
