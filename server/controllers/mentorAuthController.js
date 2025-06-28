const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mentor = require("../models/MentorModel");

// Replace with your JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Mentor Signup function
const mentorSignup = async (req, res) => {
  const { 
    mentor_email, 
    mentor_name, 
    mentor_password,
    mentor_specializations,
    mentor_experience,
    mentor_company,
    mentor_title,
    mentor_bio,
    mentor_phonenumber
  } = req.body;

  try {
    // Check if the mentor already exists
    const existingMentor = await Mentor.findOne({ mentor_email });
    if (existingMentor) {
      return res.status(400).json({ message: "Mentor already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(mentor_password, 10);

    // Create a new mentor
    const mentor = new Mentor({
      mentor_email,
      mentor_name,
      mentor_password: hashedPassword,
      mentor_specializations: mentor_specializations || [],
      mentor_experience: mentor_experience || 0,
      mentor_company,
      mentor_title,
      mentor_bio,
      mentor_phonenumber,
    });

    // Save the mentor to the database
    await mentor.save();
    res.status(201).json({ message: "Mentor registered successfully! Please wait for admin approval." });
  } catch (err) {
    console.error("Mentor signup error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Mentor Login function
const mentorLogin = async (req, res) => {
  const { mentor_email, mentor_password } = req.body;

  try {
    // Find the mentor by email
    const mentor = await Mentor.findOne({ mentor_email });
    if (!mentor) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(mentor_password, mentor.mentor_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if mentor is verified (optional - you can remove this check if not needed)
    // if (!mentor.mentor_verified) {
    //   return res.status(403).json({ message: "Your account is pending approval. Please wait for admin verification." });
    // }

    // Generate a JWT token
    const token = jwt.sign({ mentorId: mentor._id, userType: 'mentor' }, JWT_SECRET, { expiresIn: "24h" });

    res.json({ 
      token,
      mentor: {
        id: mentor._id,
        email: mentor.mentor_email,
        name: mentor.mentor_name,
        specializations: mentor.mentor_specializations,
        experience: mentor.mentor_experience,
        company: mentor.mentor_company,
        title: mentor.mentor_title,
        verified: mentor.mentor_verified,
        rating: mentor.mentor_rating
      }
    });
  } catch (err) {
    console.error("Mentor login error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { mentorSignup, mentorLogin };
