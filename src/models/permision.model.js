// models/Permission.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PermissionSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  method: {
    type: String,
    required: true,
    maxlength: 20
  },
  path: {
    type: String,
    required: true,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
  },
  module: {
    type: String,
    required: true,
    maxlength: 255
  }
}, {
  collection: 'go_db_permissions',
  timestamps: true // tương đương với gorm.Model (createdAt, updatedAt)
});

module.exports = mongoose.model('Permission', PermissionSchema);
