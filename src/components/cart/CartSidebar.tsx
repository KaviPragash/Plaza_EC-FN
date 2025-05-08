"use client";

import { useCart, Product } from "@/contexts/CartContext";
import { useRouter } from "next/navigation"; 

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter(); 

  // 🛒 Navigate to Order Page
  const handleCheckout = () => {
    onClose();
    router.push("/order");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-80 bg-white h-full shadow-lg p-4 overflow-y-auto z-50 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {cartItems.length > 0 ? (
          <ul className="space-y-4 pb-20"> {/* 👈 Added padding at the bottom */}
            {cartItems.map((item: Product) => (
              <li key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    LKR {item.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Quantity: {item.quantity}
                  </p>
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
          <p className="text-gray-500 text-center mt-10">
            Your cart is empty.
          </p>
        )}

        {/* ✅ Checkout Button Always at the Bottom */}
        <div className="fixed bottom-4 right-4 w-[18rem]">
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}
    </>
  );
}
