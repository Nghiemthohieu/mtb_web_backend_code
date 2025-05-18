'use strict';

const cors = require('cors');

const allowedOrigins = ['http://localhost:3000', 'https://mittobom.shop']; // ✅ Thay bằng domain của bạn

const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép nếu không có origin (postman, curl) hoặc nằm trong danh sách
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const applyCORS = (app) => {
  app.use(cors(corsOptions));
};

module.exports = applyCORS;
