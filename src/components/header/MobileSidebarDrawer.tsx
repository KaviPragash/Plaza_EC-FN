"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";

interface Category {
  mCategory_code: string;
  mCategory_name: string;
}

interface Subcategory {
  SCategory_code: string;
  SCategory_name: string;
  MainCategory: {
    mCategory_code: string;
    mCategory_name: string;
  };
}

interface MobileSidebarDrawerProps {
  onClose: () => void;
  onSubcategorySelect?: (subcategoryName: string, subcategoryCode: string) => void;
}

const colorClasses = [
  { bg: "bg-gradient-to-r from-blue-500 to-blue-600", text: "text-blue-50", dot: "bg-blue-300", hover: "hover:from-blue-600 hover:to-blue-700" },
  { bg: "bg-gradient-to-r from-purple-500 to-purple-600", text: "text-purple-50", dot: "bg-purple-300", hover: "hover:from-purple-600 hover:to-purple-700" },
  { bg: "bg-gradient-to-r from-pink-500 to-pink-600", text: "text-pink-50", dot: "bg-pink-300", hover: "hover:from-pink-600 hover:to-pink-700" },
  { bg: "bg-gradient-to-r from-green-500 to-green-600", text: "text-green-50", dot: "bg-green-300", hover: "hover:from-green-600 hover:to-green-700" },
  { bg: "bg-gradient-to-r from-yellow-500 to-yellow-600", text: "text-yellow-50", dot: "bg-yellow-300", hover: "hover:from-yellow-600 hover:to-yellow-700" }
];

export default function MobileSidebarDrawer({ onClose, onSubcategorySelect }: MobileSidebarDrawerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subcategoryCodeMap, setSubcategoryCodeMap] = useState<Record<string, string>>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL;
        console.log('=== MOBILE SIDEBAR DATA FETCHING ===');
        console.log('API Base:', base);
        
        const [catRes, subRes] = await Promise.all([
          fetch(`${base}/getallMCategory`),
          fetch(`${base}/getallSubCategory`)
        ]);

        const catJson = await catRes.json();
        const subJson = await subRes.json();

        const catData: Category[] = Array.isArray(catJson) ? catJson : catJson.data || [];
        const subData: Subcategory[] = Array.isArray(subJson) ? subJson : subJson.data || [];

        console.log('Categories loaded:', catData.length);
        console.log('Subcategories loaded:', subData.length);

        setCategories(catData);
        setSubcategories(subData);

        // Create subcategory name to code mapping
        const codeMap: Record<string, string> = {};
        subData.forEach((sub) => {
          if (sub.SCategory_name && sub.SCategory_code) {
            codeMap[sub.SCategory_name] = sub.SCategory_code;
          }
        });
        
        console.log('Subcategory code map created:', codeMap);
        setSubcategoryCodeMap(codeMap);
      } catch (err) {
        console.error("Mobile Sidebar API Error:", err);
      }
    }

    fetchData();
  }, []);

  const toggleCategory = (index: number) => {
    console.log('=== CATEGORY TOGGLE ===');
    console.log('Toggling category index:', index);
    console.log('Current active index:', activeIndex);
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    console.log('=== MOBILE SUBCATEGORY CLICK ===');
    console.log('Clicked subcategory:', subcategoryName);
    console.log('Available codes map:', subcategoryCodeMap);
    console.log('onSubcategorySelect function exists:', !!onSubcategorySelect);
    console.log('onSubcategorySelect function type:', typeof onSubcategorySelect);
    
    const subcategoryCode = subcategoryCodeMap[subcategoryName];
    console.log('Found code for', subcategoryName, ':', subcategoryCode);
    
    if (subcategoryCode && onSubcategorySelect) {
      console.log('✅ Calling onSubcategorySelect with:', subcategoryName, subcategoryCode);
      onSubcategorySelect(subcategoryName, subcategoryCode);
      console.log('✅ Closing drawer');
      onClose();
    } else {
      console.log('❌ ERROR: Missing code or callback function');
      console.log('- subcategoryCode:', subcategoryCode);
      console.log('- onSubcategorySelect:', onSubcategorySelect);
    }
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 7);

  console.log('=== MOBILE SIDEBAR RENDER ===');
  console.log('Visible categories:', visibleCategories.length);
  console.log('Active index:', activeIndex);

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="w-80 bg-gradient-to-b from-white to-gray-50/80 h-full shadow-2xl backdrop-blur-sm border-r border-gray-200/50 overflow-hidden">
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
              <X size={16} className="rotate-45" />
            </span>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">Categories</h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-1" />
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-105">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-4 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="space-y-3">
            {visibleCategories.map((cat, index) => {
              const catSub = subcategories.filter(sub => sub.MainCategory.mCategory_code === cat.mCategory_code);
              const color = colorClasses[index % colorClasses.length];

              return (
                <div key={cat.mCategory_code} className="group">
                  <button
                    onClick={() => toggleCategory(index)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md ${
                      activeIndex === index
                        ? `${color.bg} ${color.text} font-semibold shadow-lg`
                        : "hover:bg-white text-gray-700 border border-gray-100 hover:border-gray-200 bg-gray-50/50"
                    }`}
                  >
                    <span className="text-sm font-medium tracking-wide">{cat.mCategory_name}</span>
                    <ChevronRight
                      size={18}
                      className={`transition-all duration-300 ${
                        activeIndex === index 
                          ? "rotate-90 text-white drop-shadow-sm" 
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    />
                  </button>

                  {activeIndex === index && (
                    <div className="mt-3 ml-3 animate-in slide-in-from-top-2 duration-300">
                      <div className="border border-gray-200/60 rounded-2xl overflow-hidden shadow-lg bg-white/95 backdrop-blur-sm">
                        <div className="p-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                          {catSub.length > 0 ? (
                            <ul className="space-y-1">
                              {catSub.map((sub) => (
                                <li key={sub.SCategory_code}>
                                  <button 
                                    onClick={() => {
                                      console.log('Subcategory button clicked:', sub.SCategory_name);
                                      handleSubcategoryClick(sub.SCategory_name);
                                    }}
                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-200 flex items-center gap-3 text-sm font-medium group/item hover:shadow-sm"
                                  >
                                    <span className={`w-2.5 h-2.5 rounded-full ${color.dot} opacity-70 group-hover/item:opacity-100 transition-opacity duration-200 shadow-sm`} />
                                    <span className="tracking-wide">{sub.SCategory_name}</span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="px-4 py-6 text-center">
                              <div className="text-gray-400 text-sm font-medium">No subcategories available</div>
                            </div>
                          )}
                        </div>

                        <div className={`border-t border-gray-200/50 ${color.bg} p-4`}>
                          <button className={`w-full text-xs text-center ${color.text} hover:underline font-semibold tracking-wide transition-all duration-200 hover:scale-105`}>
                            View All {cat.mCategory_name} →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {categories.length > 10 && (
          <div className="border-t border-gray-200/50 bg-white/90 backdrop-blur-sm p-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full text-sm text-blue-600 hover:text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-blue-200 hover:border-blue-300 hover:shadow-sm"
            >
              {showAll ? "Show Less ↑" : "View More ↓"}
            </button>
          </div>
        )}
      </div>

      <div className="flex-grow bg-black/40 backdrop-blur-md" onClick={onClose} />
    </div>
  );
}