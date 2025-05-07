import React, { useEffect, useState } from "react";
import axios from "axios";

const LostItems = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lost");
        setLostItems(response.data);
      } catch (error) {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchLostItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lost Items</h2>
      {lostItems.length === 0 ? (
        <p>No lost items reported yet.</p>
      ) : (
        <ul className="space-y-4">
          {lostItems.map((item) => (
            <li key={item._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Reported By:</strong> {item.user?.name || "Anonymous"}</p>
              <p><strong>Date:</strong> {new Date(item.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LostItems;
