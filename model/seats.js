const mongoose = require("mongoose");

const Seats = new mongoose.Schema({
  
  seat_identifier: {
    type: String,
    unique:true,
    require: true,
  },
  seat_class: {
    type: String,
    require: true,
  },
  min_price:{
    type:String
  },
  max_price:{
    type:String
  },
  normal_price:{
    type:String
  },
  id:{
    type:String
  },
  is_booked:{
    type:Boolean,
    default:false
  }
  
});

module.exports = mongoose.model("Seats", Seats);
