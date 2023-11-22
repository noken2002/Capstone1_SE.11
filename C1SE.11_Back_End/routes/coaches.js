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

router.get('/:id/seats', async (req, res) => {
    const { id } = req.params;
    const query = req.query;
    const result = await CoachController.getCoachSeatById(id, query);
    res.send(result);
  });
  
router.put('/:id/seats/status', async (req, res) => {
    const { id } = req.params;
    const { seat_number, seat_status } = req.body;
    const result = await CoachController.setSeatStatus({
      coach_id: id,
      seat_number,
      seat_status,
    });
    res.send(result);
  });

router.get('/get/getCoach', async (req, res) => {
    console.log("req", req.query)
    const { trip_id } = req.query
    const result = await CoachController.getCoachAndTiketById2(trip_id);
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