const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { username, usertype, contact, email, password} = req.body;

    if (!email || !password || !username || !contact || !usertype) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
    
    console.log("username", username,usertype, contact, email, password );
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
       username,
      usertype, 
      contact, 
      email, 
      password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.log(err,"err in reg");
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, usertype: user.usertype }, process.env.JWT_SECRET);
    res.json({ token, usertype:user.usertype, contact: user.contact, email: user.email, username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is missing.' });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the hashed password to the user's record
    user.password = hashedPassword;
    await user.save();
    res.json({ message: 'Password has been successfully updated.' });

  } catch (err) {
    res.status(500).json({ error: 'failed' });
  }
};
