'use strict';

const express = require('express');
const router = express.Router();

router.use('/access_user', require('./access_user'))
router.use('/category', require('./category'))
router.use('/product', require('./product'))
router.use("/collection", require("./collection"));
router.use("/product_review", require("./product_review"));
router.use("/cart", require("./cart"));
router.use("/code_discount", require("./codeDiscount"));
router.use("/order", require("./order"));

module.exports = router;