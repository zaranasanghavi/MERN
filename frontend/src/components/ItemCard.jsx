import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{item.title}</h3>
      <p>{item.description}</p>
      <Link to={`/item/${item.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default ItemCard;
