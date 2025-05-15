"use client";

import { ShoppingCart, FileText, CheckCircle } from 'lucide-react';

// Define valid order status types
type OrderStatus = "item_selected" | "checkout" | "purchase_confirmed";

interface OrderStatusTrackerProps {
  orderStatus: OrderStatus;
}

export default function OrderStatusTracker({ orderStatus }: OrderStatusTrackerProps) {
  // Calculate progress bar width based on status
  const getProgressWidth = () => {
    switch(orderStatus) {
      case "item_selected": return "33%";
      case "checkout": return "66%";
      case "purchase_confirmed": return "100%";
      default: return "0%";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-center mb-8">
        Checkout Progress
      </h2>
      
      {/* Progress Bar */}
      <div className="relative mb-10">
        {/* Progress Bar Background */}
        <div className="h-1 w-full bg-gray-200">
          {/* Progress Bar Fill */}
          <div 
            className="h-1 bg-blue-500 transition-all duration-300"
            style={{ width: getProgressWidth() }}
          ></div>
        </div>
        
        {/* Status Steps */}
        <div className="flex justify-between mt-4">
          {/* Item Selected */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
              orderStatus === "item_selected" ? "bg-blue-500 text-white" : 
              (orderStatus === "checkout" || orderStatus === "purchase_confirmed") ? "bg-green-500 text-white" : "bg-gray-200"
            }`}>
              <ShoppingCart size={20} />
            </div>
            <span className="text-sm mt-2 font-medium">Item Selected</span>
          </div>
          
          {/* Checkout */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
              orderStatus === "checkout" ? "bg-blue-500 text-white" : 
              orderStatus === "purchase_confirmed" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}>
              <FileText size={20} />
            </div>
            <span className="text-sm mt-2 font-medium">Checkout</span>
          </div>
          
          {/* Purchase Confirmed */}
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${
              orderStatus === "purchase_confirmed" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}>
              <CheckCircle size={20} />
            </div>
            <span className="text-sm mt-2 font-medium">Purchase Confirmed</span>
          </div>
        </div>
      </div>
      
      {/* Message based on current status */}
      <div className="p-5 bg-gray-50 rounded text-center">
        {orderStatus === "item_selected" && (
          <p className="text-gray-700">
            Items added to cart. Proceed to checkout to complete your purchase.
          </p>
        )}
        {orderStatus === "checkout" && (
          <p className="text-gray-700">
            You&apos;re at checkout. Review your order and complete payment.
          </p>
        )}
        {orderStatus === "purchase_confirmed" && (
          <p className="text-gray-700">
            Your purchase has been confirmed! Estimated delivery: May 22nd, 2025
          </p>
        )}
      </div>
    </div>
  );
}
