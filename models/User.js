const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  contact: { type: Number, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  usertype: { type: String, enum: ['offer', 'grab'], required: true }  // 'offer' for offering rides, 'grab' for looking to grab a ride
});

module.exports = mongoose.model('User', userSchema);
