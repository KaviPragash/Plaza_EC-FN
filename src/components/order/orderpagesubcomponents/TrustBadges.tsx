"use client";

import { Award, Truck, CheckCircle, Heart } from 'lucide-react';

export default function TrustBadges() {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center text-center p-4">
          <Award size={24} className="text-blue-600 mb-2" />
          <h4 className="font-medium text-gray-800">Quality Guarantee</h4>
          <p className="text-xs text-gray-500 mt-1">All products are quality checked</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Truck size={24} className="text-blue-600 mb-2" />
          <h4 className="font-medium text-gray-800">Fast Shipping</h4>
          <p className="text-xs text-gray-500 mt-1">Delivery within 3-5 business days</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <CheckCircle size={24} className="text-blue-600 mb-2" />
          <h4 className="font-medium text-gray-800">Secure Payments</h4>
          <p className="text-xs text-gray-500 mt-1">Protected by industry standards</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Heart size={24} className="text-blue-600 mb-2" />
          <h4 className="font-medium text-gray-800">Customer Satisfaction</h4>
          <p className="text-xs text-gray-500 mt-1">98% positive feedback</p>
        </div>
      </div>
    </div>
  );
}