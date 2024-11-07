const Ride = require('../models/Ride');

exports.createRide = async (req, res) => {
  try {
    const { origin, destination, date, availableSeats } = req.body;
    const ride = new Ride({
      owner: req.body.email,
      origin,
      destination,
      date,
      availableSeats
    });
    await ride.save();
    res.status(201).json({ message: 'Ride created successfully' });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ error: 'Failed to create ride' });
  }
};

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(400).json({ error: 'Failed to retrieve rides' });
  }
};
