import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true }, // Example: Electronics, Books, etc.
    image: { type: String }, // Store image path or URL
    status: { type: String, enum: ["Found", "Claimed"], default: "Found" }, // Track if item is claimed
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user
    contact: { type: String, required: true }, // Store user's phone number
    date: { type: Date, default: Date.now }, // Store the date of reporting
  },
  { timestamps: true }
);

const FoundItem = mongoose.model("FoundItem", foundItemSchema);

export default FoundItem;
