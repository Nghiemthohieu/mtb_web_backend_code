// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true, maxlength: 255 },
  tagline: { type: String, required: true, maxlength: 100 },
  description: { type: String },
  title: { type: String, required: true, maxlength: 255 },

  size: [{ type: Schema.Types.ObjectId, ref: 'ProductSize' }],
  color: [{ type: Schema.Types.ObjectId, ref: 'ProductColor' }],
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],

  product_style: { type: Schema.Types.ObjectId, ref: 'ProductStyle', default: null },
  product_material: { type: Schema.Types.ObjectId, ref: 'ProductMaterial', required: true },

  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  discount_price: { type: Number, required: true },

  avg_rating: { type: Number, default: 0 },
  rating_count: { type: Number, default: 0 },

  product_variants: [{
    color: { type: Schema.Types.ObjectId, ref: 'ProductColor' },
    size: { type: Schema.Types.ObjectId, ref: 'ProductSize' },
    stock: { type: Number },
  }],

  product_images: [{
    url: { type: String, required: true },
    alt_text: { type: String },
    color: { type: Schema.Types.ObjectId, ref: 'ProductColor' },
    is_main: { type: Boolean, default: false },
    img_hover: { type: String },
    alt_text_hover: { type: String },
  }]
}, {
  timestamps: true,
  collection: 'db_products'
});

module.exports = mongoose.model('Product', ProductSchema);
