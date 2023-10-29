const express = require('express');
const UserController = require('../app/controller/UserController');
const router = express.Router();

router.get('/', async (req, res) => {
    UserController.getAllUser(req, res);
});

module.exports = router;