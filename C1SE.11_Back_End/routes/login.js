const express = require('express');
const LoginControler = require('../app/controller/LoginControler');
const router = express.Router();
const multer = require('multer')

router.post('/',multer().none(), async (req, res) => {
    LoginControler.loginForAll(req, res);
});

module.exports = router;