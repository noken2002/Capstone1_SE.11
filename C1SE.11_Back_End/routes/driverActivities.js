const express = require('express');
const DriverActivityController = require('../app/controller/DriverActivityController');
const router = express.Router();

router.get('/customer', async (req, res) => {
  DriverActivityController.getCustomer(req, res);
});

router.get('/customer/boarded', async (req, res) => {
  DriverActivityController.getCustomerBoarded(req, res);
});

module.exports = router;
