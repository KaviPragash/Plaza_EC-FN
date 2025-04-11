
import HeroBanner from "@/components/hero/heroBanner";
import CategorySidebar from "@/components/categorySideBar";
import ProductGrid from "@/components/productGrid";
import TrendingProducts from "@/components/trendingProducts";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
     <HeroBanner />
      
      <div className="flex px-6 py-4 gap-6">
        <div className="w-1/4">
          <CategorySidebar />
        </div>
        <div className="w-3/4">
          <ProductGrid />
        </div>
      </div>

      <div className="px-6 py-10">
        <TrendingProducts />
      </div>
    </div>
  );
}
