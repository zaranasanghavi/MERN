// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFoundItem, setSelectedFoundItem] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editFoundForm, setEditFoundForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const { data: userData } = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userData);

        const { data: lostData } = await axios.get("http://localhost:5000/api/lost/user/lostitems", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLostItems(lostData);

        const { data: foundData } = await axios.get("http://localhost:5000/api/found/user/founditems", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFoundItems(foundData);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLostItemUpdate = async () => {
    try {
      if (!editForm._id) return;

      const formData = new FormData();
      formData.append("itemName", editForm.itemName);
      formData.append("description", editForm.description);
      formData.append("location", editForm.location);
      formData.append("category", editForm.category);
      formData.append("status", editForm.status);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/lost/${editForm._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLostItems((prevItems) =>
        prevItems.map((item) =>
          item._id === editForm._id ? { ...item, ...response.data } : item
        )
      );
      setSelectedItem(null);
    } catch (error) {
      console.error("Error updating lost item:", error.response?.data || error.message);
    }
  };

  const handleFoundItemUpdate = async () => {
    try {
      if (!editFoundForm._id) return;

      const formData = new FormData();
      formData.append("itemName", editFoundForm.itemName);
      formData.append("description", editFoundForm.description);
      formData.append("location", editFoundForm.location);
      formData.append("category", editFoundForm.category);
      formData.append("status", editFoundForm.status);

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/found/${editFoundForm._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setFoundItems((prevItems) =>
        prevItems.map((item) =>
          item._id === editFoundForm._id ? { ...item, ...response.data } : item
        )
      );
      setSelectedFoundItem(null);
    } catch (error) {
      console.error("Error updating found item:", error.response?.data || error.message);
    }
  };

  const openSidebar = (item) => {
    setSelectedItem(item);
    setEditForm({ ...item });
  };

  const openFoundSidebar = (item) => {
    setSelectedFoundItem(item);
    setEditFoundForm({ ...item });
  };

  const closeSidebar = () => {
    setSelectedItem(null);
    setEditForm(null);
  };

  const closeFoundSidebar = () => {
    setSelectedFoundItem(null);
    setEditFoundForm(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editForm) {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    } else if (editFoundForm) {
      setEditFoundForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredLost = lostItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFound = foundItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4 py-6"
    >
      {user ? (
        <>
          <div className="mb-6 text-center">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold text-purple-700 drop-shadow"
            >
              🎉 Welcome, {user.name}!
            </motion.h1>
            <p className="text-md mt-2 text-gray-700 italic">
              Manage your lost & found items with ease 🚀
            </p>
            <div className="mt-2 text-sm text-gray-600">
              <p>Email: {user.email} | Phone: {user.phone} | Dept: {user.department} | SAP: {user.sapId}</p>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <input
              type="text"
              placeholder="🔍 Search your items..."
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6 h-[80vh]">
            {/* Lost Items */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 text-red-600">Lost Items</h2>
              {filteredLost.length > 0 ? (
                <div className="grid gap-4">
                  {filteredLost.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative bg-red-50 border-l-4 border-red-400 p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
                      onClick={() => openSidebar(item)}
                    >
                      <h3 className="font-bold text-lg">{item.itemName}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-500">📍 {item.location} | 📂 {item.category}</p>
                      <p className="text-sm mt-1">🟡 Status: <span className="font-medium">{item.status || "Pending"}</span></p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 italic">
                  🔍 No lost items yet. Go out there and report it if you’ve lost something!
                </p>
              )}
            </div>

            {/* Found Items */}
            <div className="flex-1 bg-white rounded-lg shadow p-4 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-200 text-green-600">Found Items</h2>
              {filteredFound.length > 0 ? (
                <div className="grid gap-4">
                  {filteredFound.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="relative bg-green-50 border-l-4 border-green-400 p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
                      onClick={() => openFoundSidebar(item)}
                    >
                      <h3 className="font-bold text-lg">{item.itemName}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-500">📍 {item.location} | 📂 {item.category}</p>
                      <p className="text-sm mt-1">🟢 Status: <span className="font-medium">{item.status}</span></p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 italic">
                  📦 No found items listed. Found something? Let the world know!
                </p>
              )}
            </div>
          </div>

          {/* Edit Lost Item Sidebar */}
          <AnimatePresence>
            {selectedItem && editForm && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
              >
                <div className="bg-white rounded-lg p-6 w-[90%] md:w-1/2 shadow-lg max-h-[80vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-red-600 mb-4">Edit Lost Item: {selectedItem.itemName}</h2>
                  <input name="itemName" value={editForm.itemName} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <textarea name="description" value={editForm.description} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <input name="location" value={editForm.location} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <input name="category" value={editForm.category} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <input name="status" value={editForm.status} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <div className="mt-4 flex gap-4">
                    <button onClick={handleLostItemUpdate} className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded shadow hover:scale-105 transition" title="Save your changes">
                      💾 Save
                    </button>
                    <button onClick={closeSidebar} className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded shadow hover:scale-105 transition" title="Cancel editing">
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Edit Found Item Sidebar */}
          <AnimatePresence>
            {selectedFoundItem && editFoundForm && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
              >
                <div className="bg-white rounded-lg p-6 w-[90%] md:w-1/2 shadow-lg max-h-[80vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">Edit Found Item: {selectedFoundItem.itemName}</h2>
                  <input name="itemName" value={editFoundForm.itemName} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <textarea name="description" value={editFoundForm.description} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <input name="location" value={editFoundForm.location} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <input name="category" value={editFoundForm.category} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <input name="status" value={editFoundForm.status} onChange={handleChange} className="w-full p-2 mt-2 border rounded" />
                  <div className="mt-4 flex gap-4">
                    <button onClick={handleFoundItemUpdate} className="bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded shadow hover:scale-105 transition" title="Save your changes">
                      💾 Save
                    </button>
                    <button onClick={closeFoundSidebar} className="bg-gradient-to-r from-red-400 to-red-600 text-white px-4 py-2 rounded shadow hover:scale-105 transition" title="Cancel editing">
                      ❌ Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <p className="text-center text-lg">Loading dashboard...</p>
      )}
    </motion.div>
  );
};

export default Dashboard;
