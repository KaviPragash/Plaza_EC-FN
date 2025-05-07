"use client";

import { useState, useRef } from "react";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
  stockStatus: string;
  stockQuantity: number;
};

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const flyRef = useRef<HTMLImageElement | null>(null);
  const { addToCart, cartIconRefDesktop, cartIconRefMobile } = useCart();

  const increase = () => {
    if (quantity < product.stockQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCompleteOrder = () => {
    const isMobile = window.innerWidth < 768;
    const cartIcon = isMobile ? cartIconRefMobile.current : cartIconRefDesktop.current;

    if (flyRef.current && cartIcon) {
      const imgRect = flyRef.current.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const cloneImg = flyRef.current.cloneNode(true) as HTMLImageElement;
      cloneImg.style.position = "absolute";
      cloneImg.style.left = `${imgRect.left + window.scrollX}px`;
      cloneImg.style.top = `${imgRect.top + window.scrollY}px`;
      cloneImg.style.width = `${imgRect.width}px`;
      cloneImg.style.zIndex = "1000";
      cloneImg.style.transition = "all 0.7s ease-in-out";
      document.body.appendChild(cloneImg);

      const offsetX = cartRect.left - imgRect.left + window.scrollX;
      const offsetY = cartRect.top - imgRect.top;

      setTimeout(() => {
        cloneImg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0.2)`;
        cloneImg.style.opacity = "0.7";
      }, 50);

      setTimeout(() => {
        document.body.removeChild(cloneImg);
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        });
        onClose();
      }, 800);
    } else {
      console.error("❌ flyRef or cartIconRef is missing");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <img
          ref={flyRef}
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain rounded mb-4"
        />

        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Size: {product.size}</p>
        <p className="text-sm text-gray-600 mb-1">Stock: {product.stockStatus}</p>
        <p className="text-sm text-gray-600 mb-1">Available: {product.stockQuantity}</p>
        <p className="text-blue-600 font-bold text-md mb-3">
          LKR {product.price.toFixed(2)}
        </p>

        <QuantitySelector
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />

        <button
          onClick={handleCompleteOrder}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-4 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
}