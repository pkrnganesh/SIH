// insertUser.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Load your User schema
const User = require("./models/UserModel"); // Adjust this path if needed

const MONGO_URI = process.env.MONGODB_URI;

const createUser = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existing = await User.findOne({ user_email: "pothamsettikodanda1@gmail.com" });
    if (existing) {
      console.log("User already exists. Skipping.");
      return mongoose.disconnect();
    }

    const hashedPassword = await bcrypt.hash("ram", 10);

    const newUser = new User({
      user_email: "pothamsettikodanda1@gmail.com",
      user_name: "Kodanda",
      user_school: "SRKR",
      user_phonenumber: "9876543210",
      user_password: hashedPassword,
    });

    await newUser.save();
    console.log("✅ User created successfully!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
};

createUser();
