"use client";

import { useCart } from "@/contexts/CartContext";
import OrderItemCard from "./OrderItemCard";
import { PackageOpen, ShoppingBag } from "lucide-react";

export default function OrderItems() {
  const { cartItems } = useCart();
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header with icon */}
      <div className="bg-gradient-to-r from-blue-50 to-white p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <ShoppingBag className="text-blue-600" size={20} />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            Order Items <span className="text-blue-600">({cartItems.length})</span>
          </h2>
        </div>
      </div>
      
      {/* Items container with subtle background */}
      <div className="p-5 bg-gray-50">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((product) => (
              <OrderItemCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
            <div className="bg-blue-50 p-4 rounded-full">
              <PackageOpen size={32} className="text-blue-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">
              No items in your order yet
            </p>
            <p className="text-gray-400 text-sm max-w-md">
              Browse our products and add items to your order to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}