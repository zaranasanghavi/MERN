import express from "express";
import { registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";

import { getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/user", authMiddleware, getUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;