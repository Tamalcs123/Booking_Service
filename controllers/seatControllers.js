const Seats = require("../model/seats");

//get all seats
const all_Seats = async (req, res) => {
  try {
    const allSeats = await Seats.find();
    res.send(allSeats);
  } catch (error) {
    res.send(error);
  }
};



//get seat prices
const seat_by_Id = async (req, res) => {
  try {
    const seat = await Seats.findOne({ seat_identifier : req.params.id });
    if (!seat) {
      return response.status(404).json("Seat not found");
    }

    var price;

    const totalSeats = await Seats.countDocuments({
      seat_class: seat.seat_class,
    });
    const bookedSeat = await Seats.countDocuments({
      seat_class: seat.seat_class,
      is_booked: true,
    });
    const percentage = (bookedSeat / totalSeats) * 100;
    console.log(percentage);

    if (percentage < 40) {
      if (seat.min_price == "") {
        price = seat.normal_price;
      } else {
        price = seat.min_price;
      }
    } else if (percentage > 40 && percentage < 60) {
      if (seat.normal_price == "") {
        price = seat.max_price;
      } else {
        price = seat.normal_price;
      }
    } else {
      if (seat.max_price == "") {
        price = seat.normal_price;
      } else {
        price = seat.max_price;
      }
    }

    const seatPriceAndDetails = {
      seat_identifier: seat.seat_identifier,
      seat_class: seat.seat_class,
      min_price: seat.min_price,
      max_price: seat.max_price,
      normal_price: seat.normal_price,
      price: price,
    };

    res.send(seatPriceAndDetails);
  } catch (error) {
    res.json(error);
  }
};

module.exports = { all_Seats, seat_by_Id };
