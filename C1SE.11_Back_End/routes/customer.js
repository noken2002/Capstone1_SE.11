const express = require('express');
const CustomerController = require('../app/controller/CustomerController');
const router = express.Router();
const multer = require('multer')
const upload = multer({dest: 'upload/'});

router.get('/', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await CustomerController.getAllCustormers(id);
    console.log("Result", result);
    res.send(result)
});


router.post('/upload-image',upload.single('image'), async (req, res) => {
    CustomerController.uploadImage(req, res);
});




module.exports = router;