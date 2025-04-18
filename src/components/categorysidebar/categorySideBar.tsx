"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, MenuIcon } from "lucide-react";
import CategoryItem from "./CategoryItem";
import SubcategoryMenu from "./SubcategoryMenu";

const categories = [
  {
    type: "Electronics",
    icon: "📱",
    subcategories: ["Phones", "Laptops", "Cameras", "Accessories"],
  },
  {
    type: "Fashion",
    icon: "👕",
    subcategories: ["Men", "Women", "Shoes", "Bags"],
  },
  {
    type: "Home & Living",
    icon: "🏠",
    subcategories: ["Furniture", "Kitchen", "Decor", "Bedding"],
  },
  {
    type: "Books",
    icon: "📚",
    subcategories: ["Fiction", "Non-Fiction", "Academic", "Children"],
  },
  {
    type: "Health & Beauty",
    icon: "✨",
    subcategories: ["Skincare", "Makeup", "Personal Care", "Supplements"],
  },
];

export default function CategorySidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [activeMobileCategory, setActiveMobileCategory] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter with delay to prevent flickering
  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 300);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Toggle mobile category
  const toggleMobileCategory = (index: number) => {
    setActiveMobileCategory(activeMobileCategory === index ? null : index);
  };

  return (
    <div className="relative flex h-full" ref={containerRef}>
      {/* Desktop View */}
      <aside className="hidden md:block w-full h-[475px] bg-white p-6 border border-gray-100 shadow-md rounded-xl flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
          <span className="bg-blue-50 p-1 rounded text-blue-600">
            <MenuIcon size={20} />
          </span>
          <span>Categories</span>
        </h2>
        
        <ul className="space-y-1 flex-grow">
          {categories.map((cat, index) => (
            <li
              key={cat.type}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`relative block transition duration-200 group`}
            >
              <CategoryItem 
                type={cat.type} 
                icon={cat.icon}
                isHovered={hoveredIndex === index} 
              />
              
              {/* Hover indicator line with animation */}
              <div 
                className={`absolute left-0 top-0 w-1 h-full rounded-full bg-blue-500 transition-all duration-300 transform ${
                  hoveredIndex === index ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`} 
              />
            </li>
          ))}
        </ul>
        
        {/* Optional: Add a footer section to help fill vertical space */}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="text-xs text-gray-500 text-center">
            Browse all our categories for the best deals
          </div>
        </div>
      </aside>

      {/* Subcategory Menu - Desktop */}
      {hoveredIndex !== null && (
        <div
          className="absolute left-full top-0 z-10 h-full ml-4 hidden md:block"
          onMouseEnter={() => setHoveredIndex(hoveredIndex)}
          onMouseLeave={handleMouseLeave}
        >
          <SubcategoryMenu
            category={categories[hoveredIndex].type}
            subcategories={categories[hoveredIndex].subcategories}
            visible={true} 
          />
        </div>
      )}

      {/* Mobile View */}
      <div className="block md:hidden w-full bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden">
        <button 
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="w-full p-4 flex items-center justify-between font-medium text-gray-700 bg-white"
        >
          <div className="flex items-center gap-2">
            <span className="bg-blue-50 p-1 rounded text-blue-600">
              <MenuIcon size={18} />
            </span>
            <span>Categories</span>
          </div>
          <ChevronDown 
            size={18} 
            className={`text-gray-500 transition-transform duration-300 ${mobileExpanded ? 'transform rotate-180' : ''}`} 
          />
        </button>
        
        {mobileExpanded && (
          <div className="border-t border-gray-100">
            {categories.map((cat, index) => (
              <div key={cat.type} className="border-b border-gray-100 last:border-b-0">
                <button 
                  onClick={() => toggleMobileCategory(index)}
                  className={`w-full p-3 flex items-center justify-between text-left 
                    ${activeMobileCategory === index ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700'}`}
                >
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span className="font-medium">{cat.type}</span>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={`text-gray-400 transition-transform duration-300 
                      ${activeMobileCategory === index ? 'transform rotate-90' : ''}`} 
                  />
                </button>
                
                {activeMobileCategory === index && (
                  <div className="bg-gray-50 py-1">
                    {cat.subcategories.map((sub) => (
                      <button 
                        key={sub} 
                        className="w-full py-2 px-10 text-left text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}