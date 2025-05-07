import React from "react";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams(); // Get item ID from URL
  const item = {
    id,
    title: "Lost Wallet",
    description: "Black leather wallet near cafeteria",
    category: "Accessories",
    contact: "user@example.com",
    image: "https://via.placeholder.com/300",
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
      <img src={item.image} alt={item.title} className="w-full max-w-md mb-4 rounded-lg" />
      <p className="text-lg"><strong>Description:</strong> {item.description}</p>
      <p className="text-lg"><strong>Category:</strong> {item.category}</p>
      <p className="text-lg"><strong>Contact:</strong> <a href={`mailto:${item.contact}`} className="text-blue-600 underline">{item.contact}</a></p>
    </div>
  );
};

export default ItemDetails;
