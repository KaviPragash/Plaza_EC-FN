"use client";

import HeroBanner from "@/components/hero/heroBanner";
import CategorySidebar from "@/components/categorysidebar/DesktopCategorySideBar";
import ProductGrid from "@/components/product/productGrid";
import MobileProductGrid from "@/components/product/MobileProductGrid";
import PromotionalBanner from "@/components/promotional/PromotionalBanner";
import TrendingProducts from "@/components/trending/trendingProducts";
import { useSubcategoryFilter } from "@/contexts/SubcategoryFilterContext";

export default function HomePage() {
  const { selectedSubcategory, selectedSubcategoryCode, clearFilter } = useSubcategoryFilter();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <HeroBanner />

      {/* Display selected subcategory info */}
      {selectedSubcategory && (
        <div className="px-4 md:px-6 py-2">
          <div className="max-w-[1440px] mx-auto">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
              <div className="flex items-center justify-between">
                <p className="text-blue-700 text-sm">
                  <span className="font-medium">Filtered by:</span> {selectedSubcategory}
                </p>
                <button
                  onClick={clearFilter}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar + Product Grid Section */}
      <div className="px-4 md:px-6 py-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:gap-[10px]">
            {/* Sidebar - hidden on mobile - NO PROPS NEEDED */}
            <div className="hidden md:block md:w-[250px] flex-shrink-0">
              <CategorySidebar />
            </div>

            {/* Product Grid */}
            <div className="flex-grow">
              {/* Mobile View */}
              <div className="block md:hidden">
                <MobileProductGrid 
                  selectedSubcategory={selectedSubcategory}
                  selectedSubcategoryCode={selectedSubcategoryCode}
                />
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <ProductGrid 
                  selectedSubcategory={selectedSubcategory}
                  selectedSubcategoryCode={selectedSubcategoryCode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner Section */}
      <PromotionalBanner />

      {/* Trending Products */}
      <div className="px-4 md:px-8 py-6">
        <div className="max-w-[1440px] mx-auto">
          <TrendingProducts />
        </div>
      </div>
    </div>
  );
}