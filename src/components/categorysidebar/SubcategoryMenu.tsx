"use client";

import { ChevronRight } from "lucide-react";

interface ColorClasses {
  bg: string;
  text: string;
  accent: string;
  shadow: string;
  border: string;
}

interface SubcategoryMenuProps {
  category: string;
  subcategories: string[];
  visible: boolean;
  color: keyof typeof colorClasses; // must match color in DesktopCategorySidebar
  onViewAll?: () => void; // optional callback for "View All"
}

// Define colors consistent with DesktopCategorySidebar
const colorClasses: Record<string, ColorClasses> = {
  blue: { bg: "bg-blue-50", text: "text-blue-700", accent: "bg-blue-500", shadow: "shadow-blue-100", border: "border-blue-200" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", accent: "bg-purple-500", shadow: "shadow-purple-100", border: "border-purple-200" },
  green: { bg: "bg-green-50", text: "text-green-700", accent: "bg-green-500", shadow: "shadow-green-100", border: "border-green-200" },
  orange: { bg: "bg-orange-50", text: "text-orange-700", accent: "bg-orange-500", shadow: "shadow-orange-100", border: "border-orange-200" },
  pink: { bg: "bg-pink-50", text: "text-pink-700", accent: "bg-pink-500", shadow: "shadow-pink-100", border: "border-pink-200" },
};

export default function SubcategoryMenu({
  category,
  subcategories,
  visible,
  color,
  onViewAll,
}: SubcategoryMenuProps) {
  if (!visible) return null;

  return (
    <div className={`w-64 max-h-[90vh] bg-white rounded-xl shadow-2xl border ${colorClasses[color].border} p-4 animate-in slide-in-from-left-2 duration-300 flex flex-col overflow-hidden`}>

      {/* Header */}
      <div className="mb-6">
        <h3 className={`font-semibold text-lg ${colorClasses[color].text} flex items-center gap-2`}>
          <div className={`w-2 h-2 ${colorClasses[color].accent} rounded-full animate-pulse`} />
          {category}
        </h3>
        <div className={`h-0.5 ${colorClasses[color].accent} w-10 mt-1 transition-all duration-500`} />
      </div>

      {/* Subcategory List */}
      <div className="flex-grow flex flex-col overflow-y-auto">
        {subcategories.length > 0 ? (
          <ul className="space-y-2 flex-grow">
            {subcategories.map((sub, index) => (
              <li
                key={sub}
                className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:${colorClasses[color].bg} hover:translate-x-1 hover:shadow-md flex items-center justify-between group`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{sub}</span>
                <ChevronRight
                  size={14}
                  className="text-gray-300 group-hover:text-gray-500 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-400 text-sm italic px-3 py-2">No subcategories</div>
        )}
      </div>

      {/* View All Button */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button
          onClick={onViewAll}
          className={`w-full text-sm ${colorClasses[color].text} hover:${colorClasses[color].accent} hover:text-white px-3 py-2 rounded-lg transition-all duration-300 font-medium hover:shadow-md transform hover:scale-105`}
        >
          View All {category}
        </button>
      </div>
    </div>
  );
}
