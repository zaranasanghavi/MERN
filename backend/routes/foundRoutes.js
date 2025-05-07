import express from "express";
import {
  reportFoundItem,
  getAllFoundItems,
  getUserFoundItems,
  getFoundItemById,
  getFoundItemCategories,
  updateFoundItem,
  upload,
} from "../controllers/foundItemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllFoundItems);
router.get("/categories", getFoundItemCategories);
router.post("/report", authMiddleware, upload.single("image"), reportFoundItem); // ⬅️ Move this ABOVE :id
router.get("/:id", getFoundItemById); 
router.put('/:id', authMiddleware, upload.none(), updateFoundItem); // <-- edit route
router.get("/user/founditems", authMiddleware, upload.none(), getUserFoundItems);


export default router;
