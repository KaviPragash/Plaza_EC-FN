import HeroBanner from "@/components/hero/heroBanner";
import CategorySidebar from "@/components/categorysidebar/DesktopCategorySideBar";
import ProductGrid from "@/components/product/productGrid";
import MobileProductGrid from "@/components/product/MobileProductGrid";
import PromotionalBanner from "@/components/promotional/PromotionalBanner";
import TrendingProducts from "@/components/trending/trendingProducts";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <HeroBanner />

      {/* Sidebar + Product Grid Section */}
      <div className="px-4 md:px-6 py-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:gap-[10px]">
            {/* Sidebar - hidden on mobile */}
            <div className="hidden md:block md:w-[250px] flex-shrink-0">
              <CategorySidebar />
            </div>

            {/* Product Grid */}
            <div className="flex-grow">
              {/* Mobile View */}
              <div className="block md:hidden">
                <MobileProductGrid />
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <ProductGrid />
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