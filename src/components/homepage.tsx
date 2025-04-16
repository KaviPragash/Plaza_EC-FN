import HeroBanner from "@/components/hero/heroBanner";
import CategorySidebar from "@/components/categorysidebar/categorySideBar";
import ProductGrid from "@/components/product/productGrid";
import TrendingProducts from "@/components/trendingProducts";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <HeroBanner />

      {/* Sidebar + Product Grid Section */}
      <div className="px-4 md:px-15 py-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Sidebar */}
          <div className="md:w-1/4 flex-shrink-0">
            <div className="h-full">
              <CategorySidebar />
            </div>
          </div>

          {/* Product Grid */}
          <div className="md:w-3/4 flex-grow">
            <section>
              <ProductGrid />
            </section>
          </div>
        </div>
      </div>

      {/* Trending */}
      <div className="px-4 md:px-8 py-6">
        <TrendingProducts />
      </div>
    </div>
  );
}
