// ✅ Final ProductCard.tsx with 'View' button using Eye icon
"use client";

import { useState, useRef } from "react";
import ProductModal from "./ProductModal";
import { Heart, Eye } from "lucide-react";

export type Product = {
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
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const flyRef = useRef<HTMLImageElement | null>(null);

  const formattedPrice = new Intl.NumberFormat("en-LK", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <>
      <div
        className="group relative bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-gray-100 transition-all duration-500"
        style={{
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.03)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 z-10 bg-white/90 p-2 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hover:bg-gray-50"
          aria-label="Add to favorites"
        >
          <Heart
            size={16}
            className={`${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
            } transition-colors`}
          />
        </button>

        <div className="relative w-full pt-[91%] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img
            ref={flyRef}
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col flex-grow p-4">
          <div className="mb-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">
              {product.size}
            </p>
            <h3 className="font-medium text-gray-900 leading-tight line-clamp-2 text-base mb-1 group-hover:text-blue-600 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-1">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 font-bold">LKR {formattedPrice}</p>
                <p className="text-xs text-gray-500">
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} units available`
                    : "Out of stock"}
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow"
              >
                <Eye size={14} />
                <span>View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
