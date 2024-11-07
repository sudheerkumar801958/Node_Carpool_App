const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadImage, getProfilePicBasedonEmail } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    // Set the destination folder where files will be stored
    cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
    // Set a unique name for the uploaded file
    cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Initialize multer with the storage configuration
const upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
          // Only allow images
          const filetypes = /jpeg|jpg|png|gif/;
          const mimetype = filetypes.test(file.mimetype);
      
          if (mimetype) {
            return cb(null, true);
          } else {
            cb(new Error('Only image files are allowed!'));
          }
        },
}).single('image');

router.post('/uploadimage', upload, /* authMiddleware, */ uploadImage);  
router.get('/getprofilepic/:email', /* authMiddleware, */ getProfilePicBasedonEmail);

module.exports = router;
