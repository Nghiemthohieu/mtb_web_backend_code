'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  img: {
    type: String,
    required: true,
  },
  name_navbar: {
    type: String,
  },
  name_home: {
    type: String,
  },
  is_virtual: {
    type: Boolean,
    default: false,
  },
  is_navbar: {
    type: Boolean,
    default: false,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  sort_order: {
    type: Number,
    default: 0,
  },

  // Many-to-Many: products <-> categories
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    }
  ],

  // Self-reference: parent category
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },

  // Self-reference: many children
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    }
  ],

  // Many-to-Many: category_fake
  featured: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    }
  ],
}, {
  timestamps: true,
  collection: 'db_categories'
});

module.exports = mongoose.model('Category', categorySchema);
