"use client";

import { useState } from "react";
import { X, ChevronRight } from "lucide-react";

const categories = [
  {
    type: "Electronics",
    subcategories: ["Phones", "Laptops", "Cameras", "Accessories"],
  },
  {
    type: "Fashion",
    subcategories: ["Men", "Women", "Shoes", "Bags"],
  },
  {
    type: "Home & Living",
    subcategories: ["Furniture", "Kitchen", "Decor", "Bedding"],
  },
  {
    type: "Books",
    subcategories: ["Fiction", "Non-Fiction", "Academic", "Children"],
  },
  {
    type: "Health & Beauty",
    subcategories: ["Skincare", "Makeup", "Personal Care", "Supplements"],
  },
];

export default function MobileSidebarDrawer({ onClose }: { onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Sidebar */}
      <div className="w-72 bg-white h-full shadow-lg p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li key={cat.type}>
              <button
                onClick={() => toggleCategory(index)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all
                  ${
                    activeIndex === index
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
              >
                <span>{cat.type}</span>
                <ChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-90 text-blue-500" : "text-gray-400"
                  }`}
                />
              </button>

              {activeIndex === index && (
                <div className="mt-2 ml-2 border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white">
                    <p className="text-sm font-medium">{cat.type}</p>
                    <p className="text-xs text-blue-100">Select a subcategory</p>
                  </div>

                  <ul className="p-2 bg-white">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 rounded-full bg-blue-400 opacity-70"></span>
                          {sub}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-gray-100 bg-gray-50 p-3">
                    <button className="w-full text-xs text-center text-blue-600 hover:text-blue-700 font-medium">
                      View All {cat.type}
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop */}
      <div
        className="flex-grow bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
    </div>
  );
}
