const express = require("express");
const { mentorSignup, mentorLogin } = require("../controllers/mentorAuthController");

const router = express.Router();

// Mentor Signup route
router.post("/signup", mentorSignup);

// Mentor Login route
router.post("/login", mentorLogin);

module.exports = router;
