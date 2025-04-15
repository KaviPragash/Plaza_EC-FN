type Props = {
    subcategories: string[];
    visible: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  
  export default function SubcategoryMenu({
    subcategories,
    visible,
    onMouseEnter,
    onMouseLeave,
  }: Props) {
    if (!visible) return null;
  
    return (
      <div
        className="w-64 h-full shadow-lg rounded-xl border border-gray-200 bg-white"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h3 className="text-sm font-semibold text-gray-600 px-4 py-2 border-b">
          SUBCATEGORIES
        </h3>
        <ul className="divide-y divide-gray-200">
          {subcategories.map((sub) => (
            <li
              key={sub}
              className="px-4 py-3 hover:bg-blue-100 cursor-pointer transition-colors"
            >
              {sub}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  