"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Menu,
  Smartphone,
  ShoppingCart,
  CupSoda,
  Heart,
  Folder,
  ChevronRight,
} from "lucide-react";
import type { JSX } from "react";
import SubcategoryMenu from "./SubcategoryMenu";

interface Category {
  mCategory_code: string;
  mCategory_name: string;
}

interface SubCategory {
  SCategory_code: string;
  SCategory_name: string;
  MainCategory: {
    mCategory_code: string;
    mCategory_name: string;
  };
}

const iconMap: Record<string, JSX.Element> = {
  "Electronics Items": <Smartphone size={18} />,
  "Grocery & Staples": <ShoppingCart size={18} />,
  "Beverages": <CupSoda size={18} />,
  "Health & Beauty": <Heart size={18} />,
  default: <Folder size={18} />,
};

const colorList = ["blue", "purple", "green", "orange", "pink"];

function CategoryItem({ type, icon }: { type: string; icon: JSX.Element }) {
  return (
    <div className="flex items-center justify-between p-3 group">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-gray-700">{type}</span>
      </div>
      <ChevronRight
        size={16}
        className="text-gray-400 group-hover:text-blue-600 group-hover:stroke-[2.5] transition-all"
      />
    </div>
  );
}

export default function CategorySidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategoriesMap, setSubcategoriesMap] = useState<
    Record<string, string[]>
  >({});
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [submenuStyle, setSubmenuStyle] = useState<React.CSSProperties>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [categoryColors, setCategoryColors] = useState<Record<string, string>>(
    {}
  );
  const [isSticky, setIsSticky] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track scroll position to determine sticky state
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      // Consider it "at page top" when container is more than 200px from viewport top
      // This accounts for your hero section height
      const shouldBeAtTop = containerRect.top > 200;
      setIsSticky(!shouldBeAtTop); // Sticky when NOT at top
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const base =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          "https://plaza.verveautomation.com/api/auth";
        const [catRes, subRes] = await Promise.all([
          fetch(`${base}/getallMCategory`),
          fetch(`${base}/getallSubCategory`),
        ]);

        const catJson = await catRes.json();
        const subJson = await subRes.json();

        const catData: Category[] = Array.isArray(catJson)
          ? catJson
          : catJson.data || [];
        const subData: SubCategory[] = Array.isArray(subJson)
          ? subJson
          : subJson.data || [];

        setCategories(catData);

        // assign random colors per category
        const colors: Record<string, string> = {};
        catData.forEach((cat: Category) => {
          colors[cat.mCategory_code] =
            colorList[Math.floor(Math.random() * colorList.length)];
        });
        setCategoryColors(colors);

        // group subcategories by main category
        const grouped: Record<string, string[]> = {};
        for (const sub of subData) {
          const mainCode = sub.MainCategory?.mCategory_code;
          const name = sub.SCategory_name;
          if (mainCode) {
            if (!grouped[mainCode]) grouped[mainCode] = [];
            grouped[mainCode].push(name);
          }
        }

        setSubcategoriesMap(grouped);
        setIsVisible(true);
      } catch (error) {
        console.error("API error:", error);
      }
    }

    fetchData();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const calculateSubmenuPosition = useCallback((categoryElement: HTMLElement) => {
    const categoryRect = categoryElement.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    
    console.log('=== POSITION CALCULATION ===');
    console.log('Is sticky:', isSticky);
    console.log('Category top:', categoryRect.top);
    console.log('Category right:', categoryRect.right);
    console.log('Container top:', containerRect?.top);
    
    // Check if we're at the initial scroll position (page top)
    // Use a higher threshold to catch the initial state better
    const isAtPageTop = containerRect && containerRect.top > 200;
    
    console.log('Is at page top:', isAtPageTop);
    
    if (isAtPageTop) {
      // Page at top: position submenu beside the sidebar (traditional way)
      console.log('✅ Using sidebar alignment - beside main categories');
      return {
        position: 'fixed' as const,
        top: `${categoryRect.top}px`,
        left: `${categoryRect.right + 12}px`,
        zIndex: 50
      };
    } else {
      // Page scrolled: position submenu directly inline with the category item
      console.log('❌ Using inline positioning - directly with category');
      const sidebarWidth = categoryElement.offsetWidth;
      return {
        position: 'fixed' as const,
        top: `${categoryRect.top}px`,
        left: `${categoryRect.right + 12}px`, // Start from the right edge of category
        zIndex: 50,
        width: '280px' // Fixed width for better control
      };
    }
  }, [isSticky]);

  const handleMouseEnter = (
    index: number,
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIndex(index);
    
    const newStyle = calculateSubmenuPosition(e.currentTarget);
    console.log('Setting submenu style:', newStyle);
    setSubmenuStyle(newStyle);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredIndex(null), 150);
  };

  const handleMenuMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Recalculate position when sticky state changes and we have a hovered item
  useEffect(() => {
    if (hoveredIndex !== null) {
      const categoryElement = document.querySelector(`[data-category-index="${hoveredIndex}"]`) as HTMLElement;
      if (categoryElement) {
        const newStyle = calculateSubmenuPosition(categoryElement);
        setSubmenuStyle(newStyle);
      }
    }
  }, [isSticky, hoveredIndex, calculateSubmenuPosition]);

  const visibleCategories = expanded ? categories : categories.slice(0, 5);

  return (
    <div className="relative flex h-full py-8" ref={containerRef}>
      <aside
        className={`hidden md:block w-full bg-gradient-to-br from-white via-gray-50 to-blue-50/30 p-6 border border-gray-200 shadow-xl rounded-2xl flex flex-col backdrop-blur-sm transition-all duration-1000 hover:shadow-2xl ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ height: !expanded ? "620px" : "auto" }}
      >
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

        <ul
          className={`space-y-3 ${
            expanded ? "flex-grow" : "flex-grow overflow-hidden"
          }`}
        >
          {visibleCategories.map((cat, index) => (
            <li
              key={cat.mCategory_code}
              data-category-index={index}
              onMouseEnter={(e) => handleMouseEnter(index, e)}
              onMouseLeave={handleMouseLeave}
              className="relative block transition-all duration-300 animate-in slide-in-from-left-4 hover:translate-x-1"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="rounded-lg bg-white/50 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                <CategoryItem
                  type={cat.mCategory_name}
                  icon={iconMap[cat.mCategory_name] || iconMap.default}
                />
              </div>
            </li>
          ))}
        </ul>

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

      {/* Debug info - remove this in production */}
      <div className="fixed top-4 right-4 bg-black text-white p-2 text-xs rounded z-[999]">
        Sticky: {isSticky ? 'YES' : 'NO'} | Hovered: {hoveredIndex ?? 'None'}
      </div>

      {hoveredIndex !== null && (
        <div
          style={submenuStyle}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="hidden md:block"
        >
          <SubcategoryMenu
            category={categories[hoveredIndex].mCategory_name}
            subcategories={
              subcategoriesMap[categories[hoveredIndex].mCategory_code] || []
            }
            visible={true}
            color={categoryColors[categories[hoveredIndex].mCategory_code] || "blue"}
          />
        </div>
      )}
    </div>
  );
}