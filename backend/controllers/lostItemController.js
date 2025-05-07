import multer from "multer";
import path from "path";
import fs from "fs";
import LostItem from "../models/lostItems.js";
import mongoose from "mongoose";

// Ensure 'uploads' directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🌟 1️⃣ Configure Multer to Store Images Locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
}); 

const upload = multer({ storage });

// 🌟 2️⃣ Report Lost Item & Save Image URL
const reportLostItem = async (req, res) => {
  //debugging logs
  // console.log("REQ BODY:", req.body);
  // console.log("REQ FILE:", req.file);
  // console.log("User from token:", req.user);

  try {
    const { description, location, category } = req.body;
    const userId = req.body.userId;
    const contact = req.body.contact; // Get contact number from request body
    const itemName = req.body.name; 

    console.log("User ID:", userId);
    console.log("Contact Number:", contact);

    if (!category || !contact || !itemName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Get Image URL
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newLostItem = new LostItem({
      itemName,
      description,
      location,
      category,
      image: imageUrl,  
      status: "Lost",
      user: new mongoose.Types.ObjectId(userId),
      contact,
      date: new Date(),
    }); 
    console.log("New Lost Item:", newLostItem);

    // Save the lost item to the database
    const savedLostItem = await newLostItem.save();
    res.status(201).json({
      message: "Lost item reported successfully",
      lostItem: savedLostItem,
    });
  } catch (error) {
    console.error("❌ Error saving lost item:", error.message); // <--- ADD THIS
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🌟 3️⃣ Serve Images via Express
const getLostItemCategories = async (req, res) => {
  try {
    const categories = await LostItem.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 🌟 4️⃣ Get All Lost Items (Public Feed)
const getAllLostItems = async (req, res) => {
  try {
    const items = await LostItem.find({ status: "Lost" })
      .sort({ date: -1 })
      .populate("user", "name email phone"); // Populate user details (name and contact)
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ 5. Get Lost Items for a Specific User (Dashboard)
const getUserLostItems = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("hello chindis");
    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Create ObjectId
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    // Query for lost items by user ID
    const items = await LostItem.find({ user: userId });

    if (!items || items.length === 0) {
      return res.status(404).json({ message: "No lost items found for this user" });
    }

    res.json(items); // Return the found items
  } catch (error) {
    console.error("Error fetching lost items for user:", error);
    res.status(500).json({ message: "Server error while fetching user lost items", error: error.message });
  }
};

// ✅ 6. Get Lost Item by ID
const getLostItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await LostItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit Lost Item
const updateLostItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updates = req.body;
    // console.log("Updates:", updates); // Debugging log
    // console.log("Item ID:", itemId); // Debugging log
    // console.log("Request body:", req.body);
    // console.log("Request params:", req.params);

    // Find existing lost item by ID
    const item = await LostItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

  
    // Update the lost item with new details
    const updatedItem = await LostItem.findByIdAndUpdate(itemId, updates, {
      new: true, // Return the updated item
    });

    res.json(updatedItem); // Return the updated item details
  } catch (error) {
    console.error("Error updating lost item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  reportLostItem,
  getLostItemCategories,
  getAllLostItems,
  getUserLostItems,
  getLostItemById,
  updateLostItem, 
  upload,
};
