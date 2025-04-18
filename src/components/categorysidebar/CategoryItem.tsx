"use client";

import { ChevronRight } from "lucide-react";

type Props = {
  type: string;
  icon: string;
  isHovered: boolean;
};

export default function CategoryItem({ type, icon, isHovered }: Props) {
  return (
    <div
      className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-between
        ${isHovered 
          ? "bg-blue-50 text-blue-700 font-medium"
          : "hover:bg-gray-50 text-gray-700"
        }`}
    >
      <div className="flex items-center gap-3">
        <span className="flex-shrink-0 opacity-80">{icon}</span>
        <span>{type}</span>
      </div>
      <ChevronRight size={16} className={`transition-transform duration-300 
        ${isHovered ? 'text-blue-500 transform translate-x-1' : 'text-gray-400'}`} />
    </div>
  );
}