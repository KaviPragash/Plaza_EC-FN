"use client";

import { useCart } from "@/contexts/CartContext";
import OrderSummaryItem from "./OrderSummaryItem";
import { ShoppingCart, CreditCard, ChevronRight, Package, Truck, CheckCircle } from "lucide-react";

export default function OrderSummary() {
  const { cartItems } = useCart();

  // Calculate Total Price
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  // Add shipping and tax calculations
  const shipping = subtotal > 0 ? 350 : 0;
  const tax = subtotal * 0.05; // 5% tax
  const totalPrice = subtotal + shipping + tax;

  const handlePurchase = () => {
    alert("Proceeding to checkout..."); // This will be wired to Payment Page
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      {/* Summary Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CreditCard size={20} />
          Order Summary
        </h2>
      </div>

      {cartItems.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {/* Items List */}
          <div className="p-4 max-h-64 overflow-auto">
            <div className="space-y-1">
              {cartItems.map((item) => (
                <OrderSummaryItem
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  total={item.price * item.quantity}
                />
              ))}
            </div>
          </div>
          
          {/* Calculation Section */}
          <div className="p-4 bg-gray-50">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">LKR {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">LKR {shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">LKR {tax.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Total Section */}
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">Total</span>
              <span className="font-bold text-xl text-blue-600">
                LKR {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          
          {/* Order Benefits */}
          <div className="p-4 bg-blue-50">
            <h3 className="font-medium text-blue-800 mb-2 text-sm">Order Benefits</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-blue-500" />
                <span className="text-gray-600">Free returns within 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-blue-500" />
                <span className="text-gray-600">Free shipping over LKR 5,000</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-blue-500" />
                <span className="text-gray-600">Secured payment process</span>
              </div>
            </div>
          </div>

          {/* Purchase Button */}
          <div className="p-4">
            <button
              onClick={handlePurchase}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors group"
            >
              <ShoppingCart size={18} />
              Proceed to Checkout
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center flex flex-col items-center justify-center gap-3">
          <div className="bg-blue-50 p-4 rounded-full">
            <ShoppingCart size={32} className="text-blue-400" />
          </div>
          <p className="text-gray-500 text-lg font-medium">
            Your cart is empty
          </p>
          <p className="text-gray-400 text-sm max-w-md">
            Add items to your cart to see order summary
          </p>
        </div>
      )}
    </div>
  );
}