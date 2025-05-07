import multer from "multer";
import path from "path";
import fs from "fs";
import FoundItem from "../models/FoundItems.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Ensure 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🌟 Multer config for found item image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// 🌟 Report Found Item
const reportFoundItem = async (req, res) => {
  console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.file);
  console.log("User from token:", req.user);
  try {
    const { description, location, category } = req.body;
    const itemName = req.body.name;
    const contact = req.body.contact;
    const userId = req.body.userId; 
    console.log("User ID:", userId);
    console.log("Contact Number:", contact);

    // Fetch user to get contact number
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const foundItem = new FoundItem({
      itemName,
      description,
      location,
      category,
      image: imageUrl,
      status: "Found",
      user: new mongoose.Types.ObjectId(userId),
      contact: user.phone,
      date: new Date(),
    });

    await foundItem.save();
    res.status(201).json({
      message: "Found item reported successfully!",
      foundItem,
    });
  } catch (error) {
    console.error("❌ Error saving found item:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🌟 Get all Found Items (Public)
const getAllFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find({ status: "Found" })
    .sort({ date: -1 })
    .populate("user", "name email phone"); // Populate user details
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🌟 Get found items reported by the logged-in user
const getUserFoundItems = async (req, res) => {
  try {
    // console.log("🔑 User ID from token:", req.user);

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Query for found items by user ID
    const userId = new mongoose.Types.ObjectId(req.user.userId);
    const items = await FoundItem.find({ user: userId }).sort({ date: -1 });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No found items reported by this user" });
    }

    res.json(items); // Return the found items
  } catch (error) {
    console.error("❌ Error fetching found items for user:", error.message);
    res.status(500).json({ message: "Server error while fetching user found items", error: error.message });
  }
};

// 🌟 Get Found Item by ID
const getFoundItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await FoundItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🌟 Get Found Item Categories
const getFoundItemCategories = async (req, res) => {
  try {
    const categories = await FoundItem.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// 🌟 Update Found Item
const updateFoundItem = async (req, res) => {
  try {
    const foundItemId = req.params.id;
    console.log("🔧 Updating Found Item ID:", foundItemId);
    console.log("📦 Received Body:", req.body);

    const updatedFields = {
      itemName: req.body.itemName,
      description: req.body.description,
      location: req.body.location,
      status: req.body.status,
    };

    const updatedItem = await FoundItem.findByIdAndUpdate(foundItemId, updatedFields, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ msg: "Found item not found" });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("❌ Error updating found item:", error.message);
    res.status(500).json({ msg: "Server error while updating found item" });
  }
};

export {
  reportFoundItem,
  getAllFoundItems,
  getUserFoundItems,
  getFoundItemById,
  getFoundItemCategories,
  updateFoundItem,
  upload,
};
