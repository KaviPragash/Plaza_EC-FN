"use client";

import { Product } from "@/contexts/CartContext";
import QuantitySelector from "@/components/product/QuantitySelector";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react";

type OrderItemCardProps = {
  product: Product;
};

export default function OrderItemCard({ product }: OrderItemCardProps) {
  const { addToCart } = useCart();
  const { name, price, quantity, image } = product;

  const handleIncrease = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      addToCart({ ...product, quantity: -1 });
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-center gap-4 border-l-4 border-blue-500">
      {/* Product Image with enhanced presentation */}
      <div className="relative">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
          {quantity}
        </span>
      </div>

      {/* Product Details with improved typography */}
      <div className="flex-grow space-y-1 text-center md:text-left">
        <div className="flex items-center gap-2">
          <ShoppingBag size={16} className="text-blue-600 hidden md:block" />
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{name}</h3>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-sm">
          <p className="text-gray-500 flex items-center justify-center md:justify-start">
            <span className="font-medium">Unit Price:</span>
            <span className="ml-1 text-gray-700">LKR {price.toFixed(2)}</span>
          </p>
          <span className="hidden md:block text-gray-300">•</span>
          <p className="font-bold flex items-center justify-center md:justify-start">
            <span className="text-gray-600">Total:</span>
            <span className="text-blue-600 ml-1">LKR {totalPrice.toFixed(2)}</span>
          </p>
        </div>
      </div>

      {/* Control Section */}
      <div className="flex items-center gap-4">
        {/* Quantity Selector */}
        <div className="bg-gray-50 p-2 rounded-lg">
          <QuantitySelector
            quantity={quantity}
            increase={handleIncrease}
            decrease={handleDecrease}
          />
        </div>
        
        {/* Remove button */}
        <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}