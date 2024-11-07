const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  availableSeats: { type: Number, required: true }
});

module.exports = mongoose.model('Ride', rideSchema);
