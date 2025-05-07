import User from "../models/User.js";

// Controller to register a new user
export const registerUser = async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging log
    const { name, sapId, department, phone, email, password } = req.body;

     // Check if all required fields are provided
     if (!name || !sapId || !department || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({ name, sapId, department, phone, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller to log in a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    if(!req.user){
      return res.status(400).json({ message: "User not received!!" });
    }
    const user = await User.findById(req.user.userId).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
