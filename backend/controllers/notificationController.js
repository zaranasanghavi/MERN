import Notification from "../models/Notification.js";

// Create a new notification
export const sendNotification = async (req, res) => {
  try {
    const { userId, itemName, message } = req.body;
    console.log("Received data:", req.body); // Debugging log

    const user_id = req.user.userId; // Assuming `authMiddleware` attaches the user to `req.user`
    // Ensure the user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Validate required fields
    if (!userId || !itemName || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new notification
    const notification = new Notification({
      userId, // The user who will receive the notification
      raisedBy: req.user.userId, // Automatically set the user who raised the notification
      itemName,
      message,
      read: false, // Default to unread
      status: "Unread", // Default status
    });

    // Save the notification to the database
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Failed to create notification", error: error.message });
  }
};

// Fetch notifications for a specific user
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming `authMiddleware` attaches the user to `req.user`

    const notifications = await Notification.find({ userId })
      .populate("raisedBy", "name email") // Populate the `raisedBy` field with user details
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
  }
};

// Mark notifications as read
export const markNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming `authMiddleware` attaches the user to `req.user`

    const result = await Notification.updateMany(
      { userId, read: false }, // Find unread notifications for the user
      { $set: { read: true } } // Mark them as read
    );

    res.status(200).json({ message: "Notifications marked as read", result });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ message: "Failed to mark notifications as read", error: error.message });
  }
};

// Update the status of a notification
export const updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params; // Extract the notification ID from the URL
    const { status } = req.body;
    console.log("Updating notification status:", req.body); // Debugging log
    console.log("Notification ID:", id); // Debugging log

    if (!["Unread", "Accepted", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedNotification = await Notification.findByIdAndUpdate(
      id, // Use the ID from the URL to find the notification
      { $set: { status } },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error("Error updating notification status:", error);
    res.status(500).json({ message: "Failed to update notification status", error: error.message });
  }
};