import express from "express";
import { sendNotification, getUserNotifications, markNotificationsAsRead, updateNotificationStatus } from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to send notification
router.post("/", authMiddleware, sendNotification);

// Route to fetch notifications for a specific user
router.get("/:id", authMiddleware, getUserNotifications);

// Route to mark notifications as read
router.put("/markread/:userId", authMiddleware, markNotificationsAsRead);

// Route to update notification status
// This route should be protected with authentication middleware
router.put("/:id/status", updateNotificationStatus);

export default router;
