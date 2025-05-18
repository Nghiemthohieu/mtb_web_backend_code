"use strict";

const express = require("express");
const { asyncHandler } = require("../../../auth/checkAuth");
const CodeDiscountController = require("../../../controllers/codeDiscount.controller");
const { authenticationUser } = require("../../../auth/authUtils");

const router = express.Router();
router.use(authenticationUser);
router.post("/checkCode", asyncHandler(CodeDiscountController.getCodeDiscount));
router.get("/list", asyncHandler(CodeDiscountController.getAllCodeDiscountByDate));

module.exports = router;
