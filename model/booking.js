const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const seatBooking = new mongoose.Schema({
  seat_id: {
    type: Schema.Types.ObjectId,
    ref:"Seats"
  },
  name: {
    type: String,
    require: true,
  },
  phone_no: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Booking", seatBooking);
