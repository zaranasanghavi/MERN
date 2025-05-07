import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, sapId, department, phone, email, password } = req.body;
    if (!name || !sapId || !department || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ name, sapId, department, phone, email, password: hashedPassword });
    await newUser.save();

    if(!process.env.JWT_SECRET) {
      console.error("🚨 Missing JWT_SECRET in .env!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "4h" });
    console.log("🔑 Token Generated:", token); // Debugging log

    // Ensure token is included in response
    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
    
  } catch (error) {
    console.error("🚨 Registration Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Ensure JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("🚨 Missing JWT_SECRET in .env!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "4h" });

    console.log("🔑 Token Generated:", token); // Debugging log

    // Ensure token is included in response
    res.status(200).json({
      token: token, // Explicitly return the token
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("🚨 Login Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

