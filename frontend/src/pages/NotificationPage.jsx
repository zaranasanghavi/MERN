import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const NotificationsPage = () => {
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return (window.location.href = "/login");

        const res = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserId(res.data._id);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!userId || !token) return;

      const res = await axios.get(`http://localhost:5000/api/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotifications(res.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationStatus = async (notificationId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = notifications.map((n) =>
        n._id === notificationId ? { ...n, status: newStatus } : n
      );
      setNotifications(updated);
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setStatus(notification.status);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setStatus("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <motion.h1
        className="text-3xl font-bold text-center text-indigo-700 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🔔 Your Notifications
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-center text-gray-500">You have no notifications.</p>
      ) : (
        <ul className="space-y-4 max-w-2xl mx-auto">
          {notifications.map((n) => (
            <motion.li
              key={n._id}
              className={`p-4 border rounded-lg shadow-md bg-white hover:bg-gray-50 cursor-pointer ${
                n.status === "Unread" ? "border-blue-400" : "opacity-60"
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => openModal(n)}
            >
              <p className="text-gray-800 font-medium">{n.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(n.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Status: {n.status}</p>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                Notification Details
              </h2>

              <p className="mb-2">
                <strong>Raised By:</strong>{" "}
                {selectedNotification.raisedBy?.name || "Unknown"}
              </p>
              <p className="mb-2">
                <strong>Item:</strong> {selectedNotification.itemName}
              </p>
              <p className="mb-2">
                <strong>Message:</strong> {selectedNotification.message}
              </p>
              <p className="mb-4 text-sm text-gray-500">
                <strong>Time:</strong>{" "}
                {new Date(selectedNotification.createdAt).toLocaleString()}
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status:
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Unread">Unread</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateNotificationStatus(selectedNotification._id, status);
                    closeModal();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsPage;
