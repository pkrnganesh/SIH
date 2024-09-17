const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// Replace with your JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Signup function
const signup = async (req, res) => {
  const { user_email, user_name, user_school, user_phonenumber, user_password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ user_email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Create a new user
    const user = new User({
      user_email,
      user_name,
      user_school,
      user_phonenumber,
      user_password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login function
const login = async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { signup, login };
