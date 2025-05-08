"use client";

import { useCart } from "@/contexts/CartContext";
import OrderSummaryItem from "./OrderSummaryItem";
import { ShoppingCart } from "lucide-react";

export default function OrderSummary() {
  const { cartItems } = useCart();

  // 🧮 Calculate Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    alert("Proceeding to checkout..."); // 🚀 This will be wired to Payment Page
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      {cartItems.length > 0 ? (
        <div className="space-y-2">
          {cartItems.map((item) => (
            <OrderSummaryItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              total={item.price * item.quantity}
            />
          ))}

          {/* Divider */}
          <div className="border-t my-4"></div>

          {/* Total and Purchase */}
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-xl text-green-600">
              LKR {totalPrice.toFixed(2)}
            </span>
          </div>

          {/* ✅ Blue Purchase Button */}
          <button
            onClick={handlePurchase}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Purchase Order
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No items in the cart.
        </p>
      )}
    </div>
  );
}
