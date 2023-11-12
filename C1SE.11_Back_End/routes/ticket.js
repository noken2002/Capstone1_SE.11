const express = require('express');
const TicketController = require('../app/controller/TicketController');
const multer = require('multer');
const router = express.Router();

router.get('/', async (req, res) => {
    TicketController.getTickets(req, res);
  });

router.get('/getQR/:id', async (req, res) => {
  TicketController.generateQRCode(req, res);
});


router.get('/getTicket/:id', async (req, res) => {
  TicketController.getTicket(req, res);
});
router.post('/storeTicket', multer().none(), async (req, res) => {
  TicketController.storeTicket(req, res);
});

router.post('/generateTicket', multer().none(), async (req, res) => {
  TicketController.generateTicket(req, res);
});

module.exports = router;
