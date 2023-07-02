const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const csv = require("csv-parser");
const fs = require("fs");
const Seat= require("./model/seats");
const seatRoutes= require('./routes/seatRoutes')
const bookingRoutes=require('./routes/bookingRoutes');
dotenv.config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Successfully Connected..");
  })
  .catch((error) => {
    console.log(error);
  });

  app.get('/import', (req, res) => {
    // Read the first CSV file
    const seatData = [];
    fs.createReadStream('SeatPricing.csv')
      .pipe(csv())
      .on('data', (data) => {
        seatData.push(data);
      })
      .on('end', () => {
        // Read the second CSV file
        fs.createReadStream('Seats.csv')
          .pipe(csv())
          .on('data', (data) => {
            // Find the corresponding seatData object
            const seat = seatData.find((seatDataItem) => seatDataItem.seat_class === data.seat_class);
  
            // Create a new Seat document and save it to MongoDB
            const newSeat = new Seat({
              seat_identifier: data.seat_identifier,
              seat_class: data.seat_class,
              min_price: seat.min_price,
              max_price: seat.max_price,
              normal_price: seat.normal_price,
            });
  
            newSeat.save();
          })
          .on('end', () => {
            res.send('Data imported successfully!');
          });
      });
  });

app.use(express.json());

app.use('/api/seats',seatRoutes);
app.use('/api/booking',bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}...`);
});
