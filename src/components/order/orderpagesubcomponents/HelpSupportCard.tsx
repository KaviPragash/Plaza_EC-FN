"use client";

import { HelpCircle, Phone } from 'lucide-react';

export default function HelpSupportCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <HelpCircle size={18} className="text-blue-600" />
        Need Help?
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="bg-blue-100 p-2 rounded-full">
            <Phone size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Customer Support</p>
            <p className="text-sm text-gray-500">Available 24/7</p>
          </div>
          <a href="tel:+944123456789" className="ml-auto text-blue-600 text-sm font-medium">Call Now</a>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="bg-blue-100 p-2 rounded-full">
            <HelpCircle size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Order Issues</p>
            <p className="text-sm text-gray-500">Need assistance?</p>
          </div>
          <button className="ml-auto text-blue-600 text-sm font-medium">Get Help</button>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm font-medium text-gray-700 mb-2">Frequently Asked Questions</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className="hover:text-blue-600 cursor-pointer">• How can I track my package?</li>
          <li className="hover:text-blue-600 cursor-pointer">• Can I modify my order?</li>
          <li className="hover:text-blue-600 cursor-pointer">• What's your return policy?</li>
        </ul>
      </div>
    </div>
  );
}