"use client";

import { useState, useRef } from "react";
import CategoryItem from "./CategoryItem";
import SubcategoryMenu from "./SubcategoryMenu";

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
];

export default function CategorySidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setHoveredIndex(null);
    }, 200);
  };

  return (
    <div className="relative flex" ref={containerRef} onMouseLeave={handleMouseLeave}>
      {/* Desktop View */}
      <aside
        className="hidden md:block w-64 bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200"
      >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex justify-center">
          Categories
        </h2>
        <ul className="space-y-2">
          {categories.map((cat, index) => (
            <li
              key={cat.type}
              onMouseEnter={() => setHoveredIndex(index)}
              className={`block border-l-4 px-4 py-3 rounded-lg transition duration-200 ${
                hoveredIndex === index
                  ? "border-blue-500 bg-blue-50"
                  : "border-transparent hover:bg-gray-100"
              }`}
            >
              <CategoryItem type={cat.type} isHovered={hoveredIndex === index} />
            </li>
          ))}
        </ul>
      </aside>

      {/* Subcategory Menu */}
      {hoveredIndex !== null && (
        <div
          className="absolute left-[16rem] top-0 z-10 h-full"
          onMouseEnter={() => setHoveredIndex(hoveredIndex)}
          onMouseLeave={handleMouseLeave}
        >
          <SubcategoryMenu
            subcategories={categories[hoveredIndex].subcategories}
            visible={true}
            onMouseEnter={() => setHoveredIndex(hoveredIndex)}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      )}

      {/* Mobile View */}
      <div className="block md:hidden w-full">
        <select className="w-full p-2 border rounded">
          {categories.map((cat) => (
            <optgroup label={cat.type} key={cat.type}>
              {cat.subcategories.map((sub) => (
                <option key={sub}>{sub}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  );
}
