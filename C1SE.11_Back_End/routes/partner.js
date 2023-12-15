const express = require('express');
const { DateTime } = require('mssql');
const PartnerController = require('../app/controller/PartnerController');
const router = express.Router();



//-----lấy thông tin partner
router.get('/:id', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await PartnerController.getPartner(id);
    console.log("Result", result);
    res.send(result)
});
//-----lấy ra tất cả các vé đang bán
router.get('/ticket/:id', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await PartnerController.getAllTicketOfPartner(id);
    console.log("Result", result);
    res.send(result)
});
//lấy ra tất cả tài xế
router.get('/driver/:id', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await PartnerController.getAllDriverOfPartner(id);
    console.log("Result", result);
    res.send(result)
});
//lấy ra tất cả các xe
router.get('/coach/:id', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await PartnerController.getAllCoachOfPartner(id);
    console.log("Result", result);
    res.send(result)
});
//lấy thông tin doanh thu
router.get('/revenue/:id', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await PartnerController.getAllRevenueOfPartner(id);
    console.log("Result", result);
    res.send(result)
});
//Thông tin tăng trưởng
router.get('/growthRate/:id', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await PartnerController.sumRevenueAndPassengerEveryMonthOfPartner(id);
    console.log("Result", result);
    res.send(result)
});
module.exports = router;