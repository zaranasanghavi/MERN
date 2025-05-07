// LostAndFoundGallery.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";

const LostAndFoundGallery = () => {
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [radioValue, setRadioValue] = useState("");

  const sendNotification = async (recipientId, itemName, message) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        "http://localhost:5000/api/notifications",
        { userId: recipientId, itemName, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ Notification sent successfully!");
    } catch (error) {
      console.error("❌ Error sending notification:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const [lostRes, foundRes] = await Promise.all([
          axios.get("http://localhost:5000/api/lost"),
          axios.get("http://localhost:5000/api/found"),
        ]);
        setLostItems(lostRes.data || []);
        setFoundItems(foundRes.data || []);
      } catch (err) {
        setError("Failed to fetch lost and found items.");
        console.error(err);
      }
    };
    fetchItems();
  }, []);

  const handleRaiseCall = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setRadioValue("");
  };

  const renderCard = (item, type) => (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="relative group bg-white shadow-md border border-blue-500 rounded-xl w-full h-[450px] overflow-hidden"
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden">
        <img
          src={`http://localhost:5000${item.image}`}
          alt={item.itemName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-44 bg-black/50 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
        <button
          onClick={() => handleRaiseCall(item)}
          className="bg-white text-black font-semibold px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
        >
          ✋ Raise A Call
        </button>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-blue-700">{item.itemName}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-sm text-gray-800">
          <strong>Category:</strong> {item.category}
        </p>
        <p className="text-sm flex items-center gap-1 text-gray-700">
          <FaMapMarkerAlt className="text-red-500" /> {item.location}
        </p>
        <div
          className={`inline-block text-xs px-2 py-1 rounded-full text-white ${
            type === "lost" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {type === "lost" ? "Lost" : "Found"}
        </div>
        <p className="text-xs mt-1 text-gray-500 italic">
          This item was reported as {type}. Help us confirm it!
        </p>
      </div>
    </motion.div>
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.h1
        className="text-4xl font-extrabold text-center text-purple-700 drop-shadow mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🎒 Lost & Found Gallery
      </motion.h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Lost Section */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-red-600 mb-4 px-2">Lost Items</h2>
        {lostItems.length > 0 ? (
          <Slider {...sliderSettings}>
            {lostItems.map((item) => renderCard(item, "lost"))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">No lost items reported yet.</p>
        )}
      </motion.div>

      {/* Found Section */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-green-600 mb-4 px-2">Found Items</h2>
        {foundItems.length > 0 ? (
          <Slider {...sliderSettings}>
            {foundItems.map((item) => renderCard(item, "found"))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">No found items reported yet.</p>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-bold text-blue-700 mb-4">
                This item might be yours?
              </h3>

              <p className="text-sm mb-1">
                <strong>Reported by:</strong> {selectedItem.user?.name || "Unknown"}
              </p>
              <p className="text-sm mb-4">
                <strong>Contact:</strong> {selectedItem.contact || "N/A"}
              </p>
              <p className="text-gray-600 mb-4">
                Would you like to raise a call and notify the owner?
              </p>

              <div className="flex flex-col gap-2 mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="response"
                    value="yes"
                    className="accent-green-600"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  Yes, notify the owner
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="response"
                    value="no"
                    className="accent-red-500"
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  No, cancel
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (radioValue === "yes") {
                      const message = `A user has raised a call about your item "${selectedItem.itemName}". Please review and respond.`;
                      await sendNotification(
                        selectedItem.user?._id,
                        selectedItem.itemName,
                        message
                      );
                      alert("📨 Notification sent to the owner!");
                      closeModal();
                    } else {
                      closeModal();
                    }
                  }}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LostAndFoundGallery;
