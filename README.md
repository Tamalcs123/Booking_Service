# Get All Seats
GET /seats
Return all the seats, ordered by the seat class and also return a boolean is_booked
for every seat.

![Screenshot (280)](https://github.com/Tamalcs123/Booking_Service/assets/87684531/6470e3dc-fdd4-4899-938f-ace5d387332e)

# Get Seat pricing
GET /seats/id
Return the seat details along with the pricing for the seat based on the class.
Note: The pricing should be returned based on the bookings previously made for
that seat class.
● Less than 40% of seats booked - use the min_price, if min_price is not
available, use normal_price
● 40% - 60% of seats booked - use the normal_price, if normal_price not
available, use max_price
● More than 60% of seats booked - use the max_price, if max_price is not
available, use normal_price

![Screenshot (282)](https://github.com/Tamalcs123/Booking_Service/assets/87684531/2257e0bb-6c88-4f74-9ceb-34a8b24149da)

# Create Booking
POST /booking
Create a booking for the selected seats.
Accept an array of seat ids to be booked, name and phone number of the user.
Create a booking if those seats are not previously booked. Return relevant error
message if any seats chosen are already booked.
Upon successful booking, return the booking ID, and the total amount of the
booking.

![Screenshot (283)](https://github.com/Tamalcs123/Booking_Service/assets/87684531/3e921c24-7043-41a1-95ac-203cffb49b93)

# Retrieve Bookings
GET /bookings?userIdentifier=<email or phone number>
Return all bookings created by the user. The API should search by email or phone
number. Any one has to be provided. Return error if no user identifier is provided.

![Screenshot (281)](https://github.com/Tamalcs123/Booking_Service/assets/87684531/434aaaf1-a381-458e-b659-bb95ef77bb63)




