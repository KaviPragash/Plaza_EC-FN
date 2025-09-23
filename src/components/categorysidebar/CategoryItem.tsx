import { ChevronRight } from "lucide-react";
import { JSX } from "react";

interface CategoryItemProps {
  type: string;
  icon: JSX.Element;
  index: number;
}

export default function CategoryItem({ type, icon, index }: CategoryItemProps) {
  return (
    <div
      className={`relative px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ease-out flex items-center justify-between group overflow-hidden
        transform hover:scale-[1.02] hover:-translate-y-0.5 hover:bg-gray-50 text-gray-700 hover:shadow-md`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-center gap-3 relative z-10">
        <span className={`flex-shrink-0 text-lg transition-all duration-300 group-hover:scale-105`}>
          {icon}
        </span>
        <span className="transition-all duration-300">{type}</span>
      </div>
      
      <ChevronRight 
        size={16} 
        className="transition-all duration-300 relative z-10 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 group-hover:scale-110" 
        style={{
          strokeWidth: '2',
          transition: 'all 0.3s ease-out'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.strokeWidth = '3';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.strokeWidth = '2';
        }}
      />
    </div>
  );
}