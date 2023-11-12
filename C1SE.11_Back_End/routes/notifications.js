const express = require('express');
const NotificationController = require('../app/controller/NotificationController');
const router = express.Router();

router.get('/', async (req, res) => {
  NotificationController.getNotifications(req, res);
});

module.exports = router;
