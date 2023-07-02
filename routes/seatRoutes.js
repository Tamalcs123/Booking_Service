const router= require('express').Router();
const seatControllers= require('../controllers/seatControllers')

router.get('/',seatControllers.all_Seats);
router.get('/:id',seatControllers.seat_by_Id)


module.exports=router;