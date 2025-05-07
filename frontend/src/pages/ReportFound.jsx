import { useState, useEffect } from "react";
import axios from "axios";
import { FaBoxOpen, FaMapMarkerAlt, FaPhoneAlt, FaImage, FaPenNib, FaPaperclip } from "react-icons/fa";

const ReportFound = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [userId, setUserId] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/found/categories");
        setCategories(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserId(response.data._id);
        setContact(response.data.phone);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const selectedCategory = category === "Other" ? customCategory : category;
    if (!selectedCategory || !userId || !contact) {
      setError("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("contact", contact);
    formData.append("name", itemName);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("category", selectedCategory);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/found/report", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess("Found item reported successfully!");
      setItemName("");
      setDescription("");
      setLocation("");
      setCategory("");
      setCustomCategory("");
      setImage(null);
    } catch (err) {
      setError("Failed to report found item.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Side - Visual / UI Section */}
      <div className="md:w-1/2 w-full bg-gradient-to-r from-green-300 text-green-600 flex flex-col items-center justify-center p-8 space-y-6">
        <h1 className="text-4xl font-bold text-green-800">Found Something?</h1>
        <p className="text-lg max-w-md text-center">
          Help return it to its rightful owner. Report the found item and connect with your campus community.
        </p>
        <img
          src="/found.webp"
          alt="Found Item"
          className="w-72 md:w-96"
        />
        <p className="italic text-sm">"Doing good, one report at a time."</p>
      </div>

      {/* Right Side - Form Section */}
      <div className="md:w-1/2 w-full bg-white p-6 md:p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Report Found Item</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <FaBoxOpen />
            <input
              type="text"
              placeholder="Item Name"
              className="w-full p-2 border border-gray-300 rounded"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <FaPaperclip />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
              <option value="Other">Other</option>
            </select>

            {category === "Other" && (
              <input
                type="text"
                placeholder="Enter Custom Category"
                className="w-full p-2 border border-gray-300 rounded"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                required
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            <FaPenNib />
            <textarea
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <input
              type="text"
              placeholder="Found Location"
              className="w-full p-2 border border-gray-300 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <FaImage />
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleFileChange}
            />
          </div>

          <button disabled={userId == ''} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportFound;
