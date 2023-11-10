const express = require('express');
const CoachController = require('../app/controller/CoachController');
const router = express.Router();

router.get('/:id', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await CoachController.getCoachAndTiketById(id);
    console.log("Result", result);
    res.send(result)
});

router.get('/get/getCoach', async (req, res) => {
    console.log("req", req.query)
    const { coach_id, trip_id } = req.query
    const result = await CoachController.getCoachAndTiketById2(coach_id, trip_id);
    console.log("Result", result);
    res.send(result)

});

router.get('/firstCoach', async (req, res) => {
    console.log("req", req.params)
    const { id } = req.params
    const result = await CoachController.getAllCoaches();
    console.log("Result", result);
    res.send({
        status: result.status,
        data: result.data[0]
    })

});

router.get('/', async (req, res) => {
    const result = await CoachController.getAllCoaches();
    console.log("result", result)
    return res.send(result)
});


module.exports = router;