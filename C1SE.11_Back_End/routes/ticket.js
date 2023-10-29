const express = require('express');
const TicketController = require('../app/controller/TicketController');
const router = express.Router();

router.get('/getQR', async (req, res) => {
    TicketController.generateQRCode(req, res);
});

module.exports = router;