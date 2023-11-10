const express = require('express');
const PaymentController = require('../app/controller/PaymentContainer');
const router = express.Router();
const multer = require('multer')

router.post('/store',multer().none(), async (req, res) => {
    PaymentController.storePayment(req, res);
});

module.exports = router;