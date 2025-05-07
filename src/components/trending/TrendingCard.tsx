"use client";

import { useState } from "react";
import ProductModal from "../product/ProductModal"; 

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  size: string;
  stockStatus: string;
  stockQuantity: number;
};

export default function TrendingCard({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="min-w-[180px] sm:min-w-[200px] bg-white border rounded-lg p-4 shadow-sm flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-contain rounded mb-2"
        />
        <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
        <p className="text-blue-600 font-bold text-sm mt-1">
          LKR {product.price.toFixed(2)}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 rounded transition"
        >
          View Product
        </button>
      </div>

      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
