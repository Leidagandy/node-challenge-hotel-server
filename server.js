const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use this array as your (in-memory) data store.
const bookings = require("./bookings.json");

app.get("/", function (request, response) {
  response.send("Hotel booking server.  Ask for /bookings, etc.");
});

// TODO add your routes and helper functions here

// 1. Create a new booking

app.post("/bookings/", (request, response) => {
  const newBooking = {
    id: bookings.length + 1,
    title: request.body.title,
    firstName: request.body.firstName,
    surname: request.body.surname,
    email: request.body.email,
    roomId: request.body.roomId,
    checkInDate: request.body.checkInDate,
    checkOutDate: request.body.checkOutDate,
  };

  for (var property in newBooking) {
    if (!newBooking[property]) {
      return response.status(400).json({ msg: "Please fill in all fields" });
    }
  }
  bookings.push(newBooking);
  response.json(bookings);
});

// 2.Read all bookings

app.get("/bookings", (request, response) => {
  response.json(bookings);
});

// 3.Read one booking, specified by Id

app.get("/bookings/:id", (request, response) => {
  const id = Number(request.params.id);
  const idSearched = bookings.filter((booking) => booking.id === id);
  const found = bookings.some((booking) => booking.id === id);

  if (found) {
    response.json(idSearched);
  } else {
    response
      .status(404)
      .send(`No bookings match the id ${id}.Please enter a valid Id.`);
  }
});

// 4. Delete a booking, specified by Id

app.delete("/bookings/:id", (request, response) => {
  const id = Number(request.params.id);

  const found = bookings.some((booking) => booking.id === id);

  if (found) {
    response.json({
      msg: "Message deleted",
      bookings: bookings.filter((booking) => booking.id !== id),
    });
  } else {
    response
      .status(404)
      .send(`No booking match the id ${id}. Please enter a valid Id.`);
  }
});

const listener = app.listen(process.env.PORT || 5000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
