const express = require('express');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');


exports.uploadImage = async (req, res) => {
    try {
        // Handling the upload response
        if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded!' });
        }

        const email = req.body.email;
        const filePath = `/uploads/${req.file.filename}`;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
          user.profilepicture = filePath;
          await user.save();
        // If the upload is successful
        res.status(200).send({
        message: 'File uploaded successfully!',
        file: req.file
        });


    } 
    catch (err) {
        console.log("err", err);
        res.status(400).json({ error: 'Failed to upload file' });
      }
};


exports.getProfilePicBasedonEmail = async (req, res) => {
try {
    const email = req.params.email;
    const user = await User.findOne({ email }); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Get the file path from the user's profile picture field
    const filePath = path.join(__dirname, '..', user.profilepicture);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: 'Image not found' });
      }
      // Send the file to the client
      res.sendFile(filePath);
      //res.status(200).json({"imageUrl" :`/uploads/${user.profilepicture.split('/')[2]}`});
    });
} 
catch (err) {
    console.log("err", err);
    res.status(400).json({ error: 'Failed to get file based on email' });
  }
};