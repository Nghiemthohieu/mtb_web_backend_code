'use strict';

const cors = require('cors');

const corsOptions = {
  origin: '*', // hoặc chỉ định cụ thể: 'http://localhost:3000'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const applyCORS = (app) => {
  app.use(cors(corsOptions));
};

module.exports = applyCORS;