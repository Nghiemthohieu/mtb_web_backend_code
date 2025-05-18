"use strict";

const express = require("express");
const router = express.Router();

router.use("/product_size", require("./product_size"));
router.use("/product_color", require("./product_color"));
router.use("/product_materials", require("./product_materials"));
router.use("/product_style", require("./product_style"));
router.use("/category", require("./category"));
router.use("/product", require("./product"));
router.use("/manager", require("./manager"));
router.use("/product_review", require("./product_review"));
router.use("/order", require("./order"));
router.use("/code_discount", require("./codeDiscount"));

module.exports = router;
