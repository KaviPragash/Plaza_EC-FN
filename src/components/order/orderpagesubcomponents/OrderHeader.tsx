"use client";

import { Home, ChevronRight, ShoppingBag } from 'lucide-react';

export default function OrderHeader() {
  return (
    <header className="bg-white border-b border-gray-200 py-6 mb-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <ShoppingBag className="text-blue-600" />
          Your Order
        </h1>
        
        {/* Breadcrumbs Navigation */}
        <nav className="flex mt-2 text-sm text-gray-500">
          <a href="#" className="flex items-center hover:text-blue-600">
            <Home size={14} />
            <span className="ml-1">Home</span>
          </a>
          <ChevronRight size={14} className="mx-2" />
          <a href="#" className="hover:text-blue-600">My Account</a>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-blue-600 font-medium">Order Details</span>
        </nav>
      </div>
    </header>
  );
}