"use client";

import { useCart, Product } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LoginForm from "@/app/auth/pages/LoginForm";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [showLogin, isOpen]);

  const handleCheckout = () => {
    if (isLoggedIn) {
      onClose();
      router.push("/order");
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleLoginPromptConfirm = () => {
    setShowLoginPrompt(false);
    setShowLogin(true);
  };

  const handleLoginPromptCancel = () => {
    setShowLoginPrompt(false);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    onClose();
    router.push("/order");
  };

  const LoginPrompt = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all">
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Almost There! 🎉</h3>
          <p className="text-white/90 text-sm">
            You need to be logged in to complete your purchase
          </p>
        </div>

        <div className="p-6">
          <div className="space-y-3 text-center mb-6">
            <p className="text-sm text-gray-600">Secure checkout</p>
            <p className="text-sm text-gray-600">Save your preferences</p>
            <p className="text-sm text-gray-600">Track your orders</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLoginPromptConfirm}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Continue to Login ✨
            </button>
            <button
              onClick={handleLoginPromptCancel}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all duration-200"
            >
              Maybe Later
            </button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
            <div className="flex items-center space-x-2">
              <span className="text-xl">💡</span>
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-orange-600">Pro tip:</span> Logged-in users get exclusive deals and faster checkout!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-96 bg-white h-full shadow-lg p-4 overflow-y-auto z-50 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>

        {cartItems.length > 0 ? (
          <ul className="space-y-4 pb-20">
            {cartItems.map((item: Product) => (
              <li key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">LKR {item.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        )}

        <div className="fixed bottom-4 right-4 w-[22rem] max-w-[90vw]">
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
          >
            Checkout
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {showLoginPrompt && <LoginPrompt />}

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {}}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}
