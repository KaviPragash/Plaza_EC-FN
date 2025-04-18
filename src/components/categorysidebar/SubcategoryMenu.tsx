"use client";

type Props = {
  category: string;
  subcategories: string[];
  visible: boolean;
};

export default function SubcategoryMenu({
  category,
  subcategories,
  visible,
}: Props) {
  if (!visible) return null;

  return (
    <div className="w-64 shadow-lg rounded-xl border border-gray-100 bg-white overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 text-white">
        <h3 className="font-medium tracking-wide">{category}</h3>
        <p className="text-xs text-blue-100 mt-1">Select a subcategory</p>
      </div>
      
      <ul className="p-2">
        {subcategories.map((sub) => (
          <li key={sub}>
            <button 
              className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-2 text-sm"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 opacity-70"></span>
              {sub}
            </button>
          </li>
        ))}
      </ul>
      
      <div className="border-t border-gray-100 bg-gray-50 p-3">
        <button className="w-full text-xs text-center text-blue-600 hover:text-blue-700 font-medium">
          View All {category}
        </button>
      </div>
    </div>
  );
}