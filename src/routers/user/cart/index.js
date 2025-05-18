"use strict";

const express = require("express");
const { asyncHandler } = require("../../../auth/checkAuth");
const { authenticationUser } = require("../../../auth/authUtils");
const CartController = require("../../../controllers/cart.controller");

const router = express.Router();

router.use(authenticationUser);

router.post("/create", asyncHandler(CartController.CreateCart));
router.put("/update", asyncHandler(CartController.UpdateCart));
router.get("/list", asyncHandler(CartController.getAllCart));
router.delete("/delete", asyncHandler(CartController.deleteCart));

module.exports = router;
