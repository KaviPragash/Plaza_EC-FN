"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Smartphone, ShoppingCart, CupSoda, Heart, Folder } from "lucide-react";
import CategoryItem from "./CategoryItem";
import SubcategoryMenu from "./SubcategoryMenu";
import { supabase } from "@/lib/supabaseClient";
import type { JSX } from "react";

interface Category {
  mCategory_code: string;
  mCategory_name: string;
}

const iconMap: Record<string, JSX.Element> = {
  "Electronics Items": <Smartphone size={18} />,
  "Grocery & Staples": <ShoppingCart size={18} />,
  "Beverages": <CupSoda size={18} />,
  "Health & Beauty": <Heart size={18} />,
  default: <Folder size={18} />
};

export default function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from("MainCategory").select("*");
      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategories(data);
      }
    }

    fetchCategories();
    setIsVisible(true);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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

  const visibleCategories = expanded ? categories : categories.slice(0, 5);

  return (
    <div className="relative flex h-full py-8" ref={containerRef}>
      <aside className={`hidden md:block w-full bg-gradient-to-br from-white via-gray-50 to-blue-50/30 p-6 border border-gray-200 shadow-xl rounded-2xl flex flex-col backdrop-blur-sm transition-all duration-1000 hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ height: !expanded ? '620px' : 'auto' }}>
        
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

        {/* Categories List */}
        <ul className={`space-y-3 ${expanded ? 'flex-grow' : 'flex-grow overflow-hidden'}`}>
          {visibleCategories.map((cat, index) => (
            <li
              key={cat.mCategory_code}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="relative block transition-all duration-300 animate-in slide-in-from-left-4 hover:translate-x-1"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="rounded-lg bg-white/50 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                <CategoryItem
                  type={cat.mCategory_name}
                  icon={iconMap[cat.mCategory_name] || iconMap.default}
                  index={index}
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Expand Button */}
        {categories.length > 5 && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-4 py-2 text-sm text-blue-600 hover:text-white bg-blue-50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-lg transition-all duration-300 hover:shadow-md border border-blue-100 hover:border-transparent"
            >
              {expanded ? "View Less" : "View More"}
            </button>
          </div>
        )}

        {/* Footer Animation */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent text-sm font-medium mb-3">
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

      {/* Submenu */}
      {hoveredIndex !== null && (
        <div
          className="absolute left-full top-0 z-20 h-full ml-2 hidden md:block"
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SubcategoryMenu
            category={categories[hoveredIndex].mCategory_name}
            subcategories={[]} 
            visible={true}
            color="blue"
          />
        </div>
      )}
    </div>
  );
}