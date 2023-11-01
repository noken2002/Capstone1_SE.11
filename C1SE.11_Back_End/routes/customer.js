const express = require('express');
const CustomerController = require('../app/controller/CustomerController');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await CustomerController.getAllCustormers(id);
    console.log("Result", result);
    res.send(result)

});

module.exports = router;