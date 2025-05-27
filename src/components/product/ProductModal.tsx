"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, X } from "lucide-react";

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
  const [isMounted, setIsMounted] = useState(false);
  const flyRef = useRef<HTMLImageElement | null>(null);
  const { addToCart, cartIconRefDesktop, cartIconRefMobile } = useCart();

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

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

  const handleClose = () => {
    onClose();
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
        handleClose();
      }, 800);
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-LK", {
    style: "decimal",
    minimumFractionDigits: 2,
  }).format(product.price);

  if (!isMounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[6px]"
      onClick={handleClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-4">
          <img
            ref={flyRef}
            src={product.image}
            alt={product.name}
            className="w-32 h-32 object-contain"
          />
        </div>

        <h2 className="text-lg font-semibold text-center mb-1">{product.name}</h2>
        <p className="text-sm text-center text-gray-500 mb-4">{product.description}</p>

        <div className="flex justify-center gap-2 text-sm text-gray-600 mb-2">
          <span className="bg-gray-100 px-2 py-1 rounded-full">Size: {product.size}</span>
          <span
            className={`px-2 py-1 rounded-full ${
              product.stockQuantity > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stockQuantity > 0
              ? `Available: ${product.stockQuantity}`
              : "Out of Stock"}
          </span>
        </div>

        <div className="text-center text-xl font-bold text-blue-600 mb-4">
          LKR {formattedPrice}
        </div>

        <QuantitySelector
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />

        <button
          onClick={handleCompleteOrder}
          disabled={product.stockQuantity === 0}
          className={`mt-4 w-full py-3 rounded-lg font-semibold text-white transition-all ${
            product.stockQuantity > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingCart size={16} className="inline mr-1" />
          {product.stockQuantity > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}
