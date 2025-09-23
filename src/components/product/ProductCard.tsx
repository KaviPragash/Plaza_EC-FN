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

export default function ProductCard({
  productGroup,
}: {
  productGroup: { selected: Product; variants: Product[] };
}) {
  const { selected: product, variants } = productGroup;

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
        className={`
          group relative bg-white rounded-xl overflow-hidden flex flex-col h-full 
          transition-all duration-500 cursor-pointer border border-slate-200
          shadow-lg shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 
          hover:-translate-y-2 hover:scale-[1.03] hover:border-blue-200
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/30 before:via-transparent before:to-purple-50/30 before:opacity-100 before:transition-opacity before:duration-500 hover:before:opacity-100
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`
            absolute top-2 right-2 z-20 p-1.5 rounded-full backdrop-blur-sm transition-all duration-300
            bg-white/90 shadow-md opacity-80 hover:opacity-100 hover:scale-110 hover:rotate-12
            ${isFavorite ? "opacity-100 scale-110 rotate-12" : ""}
          `}
          aria-label="Add to favorites"
        >
          <Heart
            size={14}
            className={`${
              isFavorite ? "fill-red-500 text-red-500 animate-pulse" : "text-gray-600"
            } transition-all duration-300`}
          />
        </button>

        {/* Image */}
        <div className="relative">
          <div className="aspect-square flex items-center justify-center relative">
            <img
              ref={flyRef}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain z-10"
            />
            <div className="absolute inset-0 opacity-60">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
              <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-200" />
              <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-blue-300 rounded-full animate-ping delay-400" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-purple-500/5 opacity-100" />
        </div>

        {/* Info */}
        <div
          className={`
          flex flex-col flex-grow p-3 bg-white transition-transform duration-300 ease-out
          ${isHovered ? "translate-y-[-4px]" : "translate-y-0"}
        `}
        >
          <div className="mb-2">
            <span className="inline-block px-2 py-0.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider rounded-full">
              {product.size}
            </span>
          </div>

          <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {product.name}
          </h3>

          <div className="border-t border-slate-100 pt-2 mt-auto">
            <div className="flex items-end justify-between mb-2">
              <div>
                <p className="text-lg font-bold text-blue-600 leading-none">
                  LKR {formattedPrice}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {product.stockQuantity > 0
                    ? `${product.stockQuantity} units`
                    : "Out of stock"}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className={`
                w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg
                font-semibold text-xs transition-all duration-300 relative overflow-hidden
                ${
                  isHovered
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30 scale-105 transform"
                    : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                }
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
                before:translate-x-[-100%] before:transition-transform before:duration-700
                ${isHovered ? "before:translate-x-[100%]" : ""}
              `}
            >
              <Eye size={14} className={isHovered ? "animate-bounce" : ""} />
              <span>View Details</span>
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal
          productGroup={{ selected: product, variants }}
          onClose={() => setShowModal(false)}
        />
      )}

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
