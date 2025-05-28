"use client";

import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import CategoryItem from "./CategoryItem";
import SubcategoryMenu from "./SubcategoryMenu";

interface Category {
  type: string;
  icon: string;
  subcategories: string[];
  color: string;
}

const categories: Category[] = [
  {
    type: "Electronics",
    icon: "📱",
    subcategories: ["Phones", "Laptops", "Cameras", "Accessories"],
    color: "blue",
  },
  {
    type: "Fashion",
    icon: "👕",
    subcategories: ["Men", "Women", "Shoes", "Bags"],
    color: "purple",
  },
  {
    type: "Home & Living",
    icon: "🏠",
    subcategories: ["Furniture", "Kitchen", "Decor", "Bedding"],
    color: "green",
  },
  {
    type: "Books",
    icon: "📚",
    subcategories: ["Fiction", "Non-Fiction", "Academic", "Children"],
    color: "orange",
  },
  {
    type: "Health & Beauty",
    icon: "✨",
    subcategories: ["Skincare", "Makeup", "Personal Care", "Supplements"],
    color: "pink",
  },
];

export default function CategorySidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    setIsVisible(true);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="relative flex h-full py-8" ref={containerRef}>
      <aside className={`hidden md:block w-full h-[500px] bg-gradient-to-br from-white via-gray-50 to-white p-6 border border-gray-200 shadow-xl rounded-2xl flex flex-col backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <span className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Menu size={20} />
            </span>
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </div>

        {/* Category List */}
        <ul className="space-y-2 flex-grow">
          {categories.map((cat, index) => (
            <li
              key={cat.type}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className={`relative block transition-all duration-300 animate-in slide-in-from-left-4`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CategoryItem 
                type={cat.type} 
                icon={cat.icon}
                index={index}
              /> 
            </li>
          ))}
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent text-sm font-medium mb-2">
            Discover Amazing Deals
          </div>
          <div className="flex justify-center space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
        </div>
      </aside>

      {hoveredIndex !== null && (
        <div
          className="absolute left-full top-0 z-20 h-full ml-2 hidden md:block" 
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SubcategoryMenu
            category={categories[hoveredIndex].type}
            subcategories={categories[hoveredIndex].subcategories}
            visible={true}
            color={categories[hoveredIndex].color}
          /> 
        </div>
      )}
    </div>
  );
}
