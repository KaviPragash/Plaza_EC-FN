"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/cart")}
      className="p-2 rounded-full hover:bg-gray-100 relative"
    >
      <ShoppingCart size={20} className="text-gray-700" />
      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full -mt-1 -mr-1">
        0
      </span>
    </button>
  );
}
