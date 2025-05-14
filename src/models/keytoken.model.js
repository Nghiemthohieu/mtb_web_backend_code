'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'db_Keys';

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true,
        ref:'User',
    },
    privateKey:{
        type:String,
        required:true,
        unique:true,
    },
    publicKey:{
        type:String,
        required:true,
        unique:true,
    },
    refreshTokenUsed:{
        type:Array,
        default:[],
    },
    refreshToken:{
        type:String,
        required:true,
        unique:true,
    }
}, {
    timestamps: true,              // Tự động thêm createdAt và updatedAt
    collection: COLLECTION_NAME  // Tên collection trong MongoDB
}
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);