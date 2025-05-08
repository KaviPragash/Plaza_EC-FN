"use client";

import { useCart } from "@/contexts/CartContext";
import OrderItemCard from "./OrderItemCard";

export default function OrderItems() {
  const { cartItems } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <h2 className="text-xl font-bold text-gray-800 p-5 border-b border-gray-100">
        Order Items
      </h2>

      <div className="p-5">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((product) => (
              <OrderItemCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 py-4 text-center">
            No items in your order.
          </p>
        )}
      </div>
    </div>
  );
}