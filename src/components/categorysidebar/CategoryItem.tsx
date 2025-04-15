// components/category/CategoryItem.tsx
import React from "react";

type Props = {
  type: string;
  isHovered: boolean;
};

export default function CategoryItem({ type, isHovered }: Props) {
  return (
    <div
      className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-300 border-r-4 ${
        isHovered
          ? "bg-blue-100 text-blue-700 font-semibold border-blue-500"
          : "hover:bg-gray-100 text-gray-800 border-transparent"
      }`}
    >
      {type}
    </div>
  );
}
