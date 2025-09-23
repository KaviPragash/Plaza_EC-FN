"use client";

import { ShoppingBag } from 'lucide-react';

export default function OrderHeader() {
  return (
    <header className="bg-white border-b border-gray-200 py-6 mb-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" />
          Your Order
        </h1>
      </div>
    </header>
  );
}
