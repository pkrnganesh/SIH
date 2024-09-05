const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const { incrementUserCount } = require("../config/firebase");

// Middleware
dotenv.config();

// Create an endpoint to increment the count and save IP address
router.get('/increment-count', async (req, res) => {
  const ipAddress = req.ip; // Capture the IP address of the user

  try {
    const newCount = await incrementUserCount(ipAddress);
    res.status(200).send(`Count incremented to: ${newCount}`);
  } catch (e) {
    console.error('Error incrementing count:', e);
    res.status(500).send('Error incrementing count');
  }
});

module.exports = router;
