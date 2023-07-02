const Booking = require("../model/booking");
const Seats = require("../model/seats");

//create a booking
const make_booking = async (req, res) => {
  const { seat_identifier, phone_no, name } = req.body;

  try {
    const seat = await Seats.findOne({ seat_identifier });
    if (!seat.is_booked) {
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

      const newBooking = await Booking.create({
        seat_id: seat,
        name: name,
        phone_no: phone_no,
      });

      await Seats.updateOne(
        { seat_identifier: seat_identifier },
        { is_booked: true }
      );
      return res.json({ Booking_id: newBooking._id, price });
    } else {
      return res.json({ message: "Seat is already booked." });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//get all bookings

const get_bookings = async (req, res) => {
  try {
    const booked = await Booking.find({
      phone_no: req.query.userIdentifier,
    });
    if (booked) {
      res.send(booked);
    } else {
      res.json({ message: "There has no booking" });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { make_booking, get_bookings };
