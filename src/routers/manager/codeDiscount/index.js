'use strict';

const express = require('express');
const { asyncHandler } = require('../../../auth/checkAuth');
const { authenticationUser } = require('../../../auth/authUtils');
const CodeDiscountController = require('../../../controllers/codeDiscount.controller');
const router = express.Router();

router.use(authenticationUser);
router.post('/create', asyncHandler(CodeDiscountController.createCodeDiscount))
router.get('/detail/:id', asyncHandler(CodeDiscountController.getCodeDiscountByID))
router.get('/list', asyncHandler(CodeDiscountController.getAllCodeDiscount))
router.put('/update', asyncHandler(CodeDiscountController.updateCodeDiscount))
router.delete('/delete/:id', asyncHandler(CodeDiscountController.deleteCodeDiscount))

module.exports = router;