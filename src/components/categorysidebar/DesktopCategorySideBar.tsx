"use client";

import { useState, useRef, useEffect } from "react";
import { MenuIcon } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative flex h-full" ref={containerRef}>
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
              className="relative block transition duration-200 group"
            >
              <CategoryItem 
                type={cat.type} 
                icon={cat.icon}
                isHovered={hoveredIndex === index} 
              />
              <div 
                className={`absolute left-0 top-0 w-1 h-full rounded-full bg-blue-500 transition-all duration-300 transform ${
                  hoveredIndex === index ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`} 
              />
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 border-t border-gray-100 text-xs text-gray-500 text-center">
          Browse all our categories for the best deals
        </div>
      </aside>

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
    </div>
  );
}
