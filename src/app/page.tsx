import Header from "@/app/components/header";
import HeroBanner from "@/app/components/heroBanner";
import CategorySidebar from "@/app/components/categorySideBar";
import ProductGrid from "@/app/components/productGrid";
import TrendingProducts from "@/app/components/trendingProducts";
import Footer from "@/app/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
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

      <Footer />
    </div>
  );
}
