import { useEffect, useState } from "react";
import axios from "axios";

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/found");
        setFoundItems(response.data);
      } catch (error) {
        console.error("Error fetching found items:", error);
      }
    };

    fetchFoundItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Found Items</h1>
      <p className="text-gray-600">Items reported as found on campus.</p>

      {foundItems.length > 0 ? (
        <ul className="mt-4">
          {foundItems.map((item) => (
            <li key={item._id} className="border p-4 mb-2 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{item.itemName}</h2>
              <p>{item.description}</p>
              <p className="text-gray-500">Found at: {item.location}</p>
              <p className="text-gray-400 text-sm">
                Reported by: {item.reportedBy.name} ({item.reportedBy.email})
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4">No found items reported yet.</p>
      )}
    </div>
  );
};

export default FoundItems;
