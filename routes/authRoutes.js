const express = require('express');
const { register, login, forgotPassword } = require('../controllers/authController');
const router = express.Router();

const auth  = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);

//check middleware
router.get('/test', auth, (req, res) => {
    res.send("Test..");
});

module.exports = router;
