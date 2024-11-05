const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  useremail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['offer', 'grab'], required: true }  // 'offer' for offering rides, 'grab' for looking to grab a ride
});

module.exports = mongoose.model('User', userSchema);
