import express from "express";
import {
  reportLostItem,
  getLostItemCategories,
  getAllLostItems,
  getUserLostItems,
  getLostItemById,
  updateLostItem, 
  upload,
} from "../controllers/lostItemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllLostItems); // all reports (public feed)
router.get("/categories", getLostItemCategories);
router.get("/:id", getLostItemById); // report by ID

// Authenticated Routes
router.get("/user/lostitems", authMiddleware, upload.none(),  getUserLostItems); // reports by logged-in user
router.post("/report", authMiddleware, upload.single("image"), reportLostItem);
router.put("/:id", authMiddleware,upload.none(), updateLostItem); // <-- edit route

export default router;
