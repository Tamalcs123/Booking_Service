const router= require('express').Router();
const bookingControllers= require('../controllers/bookingControllers');

router.post('/',bookingControllers.make_booking);
router.get('/',bookingControllers.get_bookings);

module.exports=router;