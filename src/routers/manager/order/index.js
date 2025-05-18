'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authentication } = require('../../../auth/authUtils');
const OrderController = require('../../../controllers/order.controller');
const router = express.Router();

// router.use(authentication);
router.get('/detail/:id', asyncHandler(OrderController.getOrderById))
router.get('/list', asyncHandler(OrderController.getAllOrder))
router.put('/update', asyncHandler(OrderController.updateOrderStatus))
router.delete('/delete/:id', asyncHandler(OrderController.deleteOrder))

module.exports = router;