// models/Role.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50
  },
  description: {
    type: String // Không cần giới hạn length cho text
  },
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Permission' // Giả sử bạn có collection Permission riêng
  }]
}, {
  collection: 'go_db_roles', // Giống TableName() trong GORM
  timestamps: true // tương đương với gorm.Model (createdAt, updatedAt)
});

module.exports = mongoose.model('Role', RoleSchema);
