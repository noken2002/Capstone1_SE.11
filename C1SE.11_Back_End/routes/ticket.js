const express = require('express');
const TicketController = require('../app/controller/TicketController');
const router = express.Router();

router.get('/getQR/:id', async (req, res) => {
    TicketController.generateQRCode(req, res);
});

router.get('/getTicket/:id', async (req, res) => {
    TicketController.getTicket(req, res);
});

module.exports = router;