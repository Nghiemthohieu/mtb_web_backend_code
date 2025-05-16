'use strict';

const express = require('express');
const router = express.Router();

router.use('/product_size', require('./product_size'));
router.use('/product_color', require('./product_color'));
router.use('/product_materials', require('./product_materials'));
router.use('/product_style', require('./product_style'));
router.use('/category', require('./category'));
router.use('/product', require('./product'));

module.exports = router;