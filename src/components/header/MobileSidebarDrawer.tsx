"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

interface Category {
  mCategory_code: string;
  mCategory_name: string;
}

interface Subcategory {
  sCategory_code: string;
  sCategory_name: string;
  mCategory_code: string;
}

export default function MobileSidebarDrawer({ onClose }: { onClose: () => void }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: catData, error: catErr } = await supabase
        .from("MainCategory")
        .select("mCategory_code, mCategory_name");

      const { data: subData, error: subErr } = await supabase
        .from("SubCategory")
        .select("sCategory_code, sCategory_name, mCategory_code");

      if (catErr) console.error("Category fetch error:", catErr.message);
      else setCategories(catData);

      if (subErr) console.error("Subcategory fetch error:", subErr.message);
      else setSubcategories(subData);
    }

    fetchData();
  }, []);

  const toggleCategory = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      <div className="w-72 bg-white h-full shadow-lg p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        <ul className="space-y-2">
          {categories.map((cat, index) => {
            const catSub = subcategories.filter(sub => sub.mCategory_code === cat.mCategory_code);
            return (
              <li key={cat.mCategory_code}>
                <button
                  onClick={() => toggleCategory(index)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeIndex === index
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span>{cat.mCategory_name}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      activeIndex === index ? "rotate-90 text-blue-500" : "text-gray-400"
                    }`}
                  />
                </button>

                {activeIndex === index && (
                  <div className="mt-2 ml-2 border border-gray-100 rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-white">
                      <p className="text-sm font-medium">{cat.mCategory_name}</p>
                      <p className="text-xs text-blue-100">Select a subcategory</p>
                    </div>

                    <ul className="p-2 bg-white">
                      {catSub.length > 0 ? (
                        catSub.map((sub) => (
                          <li key={sub.sCategory_code}>
                            <button className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 rounded-full bg-blue-400 opacity-70"></span>
                              {sub.sCategory_name}
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-3 text-gray-400 text-sm">No subcategories</li>
                      )}
                    </ul>

                    <div className="border-t border-gray-100 bg-gray-50 p-3">
                      <button className="w-full text-xs text-center text-blue-600 hover:text-blue-700 font-medium">
                        View All {cat.mCategory_name}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex-grow bg-black/50 backdrop-blur-sm" onClick={onClose} />
    </div>
  );
}
