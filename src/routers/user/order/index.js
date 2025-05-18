'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const OrderController = require('../../../controllers/order.controller');
const router = express.Router();

// router.use(authentication);
router.get('/detail/:id', asyncHandler(OrderController.getOrderById))
router.post('/create', asyncHandler(OrderController.createOrder))
router.get('/getByUserId', asyncHandler(OrderController.getOrderUserId))

module.exports = router;