"use client";

import { useState } from "react";
import ProductModal from "./ProductModal";

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

export default function ProductCard({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3 border border-gray-200 flex flex-col justify-between hover:scale-[1.01] duration-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-cover rounded-md mb-2"
        />
        <div className="flex flex-col flex-grow gap-0.5">
          <h3 className="text-sm font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500">Size: {product.size}</p>
          <p className="text-blue-600 font-bold text-sm mt-1">
            LKR {product.price.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 rounded-md transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
