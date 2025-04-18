"use client";

import { useState } from "react";
import QuantitySelector from "./QuantitySelector";

type Product = {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
  stockStatus: string;
  stockQuantity: number;
};

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    if (quantity < product.stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain rounded mb-4"
        />

        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Size: {product.size}</p>
        <p className="text-sm text-gray-600 mb-1">Stock: {product.stockStatus}</p>
        <p className="text-sm text-gray-600 mb-1">Available: {product.stockQuantity}</p>
        <p className="text-blue-600 font-bold text-md mb-3">
          LKR {product.price.toFixed(2)}
        </p>

        <QuantitySelector
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Complete Order
        </button>
      </div>
    </div>
  );
}
