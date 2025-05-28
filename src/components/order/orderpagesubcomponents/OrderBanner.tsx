"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function OrderBanner() {
  const router = useRouter();

  return (
    <div className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Shopping</span>
        </button>
        <div className="text-sm sm:text-base">
          Order ID: <span className="font-bold">#ORD-2023-5782</span>
        </div>
      </div>
    </div>
  );
}
