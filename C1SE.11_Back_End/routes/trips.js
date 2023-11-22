const express = require('express');
const TripController = require('../app/controller/TripController');
const router = express.Router();
const multer = require('multer')

router.get('/search',multer().none(), async (req, res) => {
    TripController.searchTrip(req, res);
});

module.exports = router;