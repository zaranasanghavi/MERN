import mongoose from "mongoose";

const lostItemSchema = new mongoose.Schema(
  {
    itemName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true }, 
    image: { type: String },
    status: { type: String, enum: ["Lost", "Returned"], default: "Lost" }, 
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    contact: { type: String, required: true }, 
    date: { type: Date, default: Date.now }, // Store the date of reporting
  },
  { timestamps: true }
);

const LostItem = mongoose.model("LostItem", lostItemSchema);
export default LostItem;
