const express = require('express');
const { createRide, getRides } = require('../controllers/rideController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', /* authMiddleware, */ createRide);  // Only offer users should be allowed here
router.get('/getrides', /* authMiddleware, */ getRides);           // All users can view rides

module.exports = router;
