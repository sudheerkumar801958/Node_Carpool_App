const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, useremail, password, userType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, useremail, password: hashedPassword, userType });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const user = await User.findOne({ useremail });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { useremail, password } = req.body;
    const user = await User.findOne({ useremail });
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
