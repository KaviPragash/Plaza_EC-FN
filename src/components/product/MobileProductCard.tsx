// ✅ Updated MobileProductCard to dynamically use cartIconRefMobile or cartIconRefDesktop
"use client";

import { useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function MobileProductCard({ product }: { product: Product }) {
  const { addToCart, cartIconRefDesktop, cartIconRefMobile } = useCart();
  const flyRef = useRef<HTMLImageElement | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
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
      const offsetY = cartRect.top - imgRect.top + window.scrollY;

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
          quantity: 1,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
      }, 800);
    } else {
      console.error("❌ Missing flyRef or cartIconRef");
    }
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-2 flex flex-col justify-between items-center text-center border border-gray-200 h-full">
      <img
        ref={flyRef}
        src={product.image}
        alt={product.name}
        className="w-full h-28 object-contain mb-2 rounded"
      />
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
        {product.name}
      </h3>

      <div className="flex flex-col items-center gap-1 mt-auto">
        <p className="text-sm font-semibold text-blue-600">
          LKR {product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md transition flex items-center"
        >
          {isAdded ? "Added!" : "Add to Cart"}
          <ShoppingCart size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
}
