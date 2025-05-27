"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import MobileProductGrid from "./MobileProductGrid";

type Product = {
  id: string;
  name: string;
  description: string;
  size: string;
  price: number;
  image: string;
  stockStatus: string;
  stockQuantity: number;
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      const dummyData: Product[] = [
        {
          id: "1",
          name: "Wireless Headphones",
          description: "High-quality sound with noise cancellation.",
          size: "Standard",
          price: 12999,
          image: "/assets/images/headphones.webp",
          stockStatus: "In Stock",
          stockQuantity: 12,
        },
        {
          id: "2",
          name: "Smartwatch",
          description: "Track fitness and receive notifications.",
          size: "Universal",
          price: 8999,
          image: "/assets/images/smartwatch.jpg",
          stockStatus: "In Stock",
          stockQuantity: 5,
        },
        {
          id: "3",
          name: "Bluetooth Speaker",
          description: "Portable speaker with rich bass.",
          size: "Medium",
          price: 5999,
          image: "/assets/images/speaker.jpg",
          stockStatus: "In Stock",
          stockQuantity: 8,
        },
        {
          id: "4",
          name: "Gaming Mouse",
          description: "Precision mouse with RGB lighting.",
          size: "Compact",
          price: 3499,
          image: "/assets/images/mouse.jpg",
          stockStatus: "In Stock",
          stockQuantity: 4,
        },
        {
          id: "5",
          name: "Laptop Stand",
          description: "Ergonomic stand for better posture.",
          size: "Adjustable",
          price: 2999,
          image: "/assets/images/laptopstand.webp",
          stockStatus: "In Stock",
          stockQuantity: 9,
        },
        {
          id: "6",
          name: "Noise Cancelling Earbuds",
          description: "Clear audio with ambient noise reduction.",
          size: "Compact",
          price: 7499,
          image: "/assets/images/earbuds.webp",
          stockStatus: "In Stock",
          stockQuantity: 7,
        },
        {
          id: "7",
          name: "Smart Glasses",
          description: "Futuristic smart glasses with AR.",
          size: "Universal",
          price: 12999,
          image: "/assets/images/smartglasses.jpg",
          stockStatus: "In Stock",
          stockQuantity: 6,
        },
        {
          id: "8",
          name: "Fitness Tracker",
          description: "Monitor your health and steps.",
          size: "Standard",
          price: 4999,
          image: "/assets/images/fitness.webp",
          stockStatus: "In Stock",
          stockQuantity: 10,
        },
        {
          id: "9",
          name: "Portable Projector",
          description: "Compact projector for movies on the go.",
          size: "Small",
          price: 13999,
          image: "/assets/images/projector.jpg",
          stockStatus: "In Stock",
          stockQuantity: 3,
        },
        {
          id: "10",
          name: "Mechanical Keyboard",
          description: "Tactile switches for better typing.",
          size: "Full",
          price: 7999,
          image: "/assets/images/keyboard.jpg",
          stockStatus: "In Stock",
          stockQuantity: 15,
        },
        {
          id: "11",
          name: "4K Monitor",
          description: "Crystal clear 27-inch display.",
          size: "27-inch",
          price: 34999,
          image: "/assets/images/monitor.jpg",
          stockStatus: "In Stock",
          stockQuantity: 5,
        },
        {
          id: "12",
          name: "Gaming Chair",
          description: "Comfort and support for long hours.",
          size: "Adjustable",
          price: 15999,
          image: "/assets/images/chair.webp",
          stockStatus: "In Stock",
          stockQuantity: 4,
        },
        {
          id: "13",
          name: "Wireless Charger",
          description: "Fast charging pad for all devices.",
          size: "Compact",
          price: 2999,
          image: "/assets/images/charger.jpg",
          stockStatus: "In Stock",
          stockQuantity: 8,
        },
        {
          id: "14",
          name: "Tablet",
          description: "Portable and powerful tablet.",
          size: "10-inch",
          price: 25999,
          image: "/assets/images/tablet.png",
          stockStatus: "In Stock",
          stockQuantity: 6,
        },
        {
          id: "15",
          name: "Smart Light Bulb",
          description: "Control lighting with your phone.",
          size: "Standard",
          price: 1999,
          image: "/assets/images/lightbulb.webp",
          stockStatus: "In Stock",
          stockQuantity: 20,
        },
        {
          id: "16",
          name: "VR Headset",
          description: "Immersive gaming and experiences.",
          size: "Adjustable",
          price: 45999,
          image: "/assets/images/vr.jpg",
          stockStatus: "In Stock",
          stockQuantity: 2,
        },
        {
          id: "17",
          name: "Streaming Microphone",
          description: "Professional quality sound.",
          size: "Standard",
          price: 8999,
          image: "/assets/images/mic.jpg",
          stockStatus: "In Stock",
          stockQuantity: 11,
        },
        {
          id: "18",
          name: "Portable SSD",
          description: "Fast and secure data storage.",
          size: "1TB",
          price: 11999,
          image: "/assets/images/ssd.webp",
          stockStatus: "In Stock",
          stockQuantity: 13,
        },
        {
          id: "19",
          name: "USB-C Hub",
          description: "Expand your laptop's connectivity.",
          size: "Multiport",
          price: 3999,
          image: "/assets/images/hub.jpg",
          stockStatus: "In Stock",
          stockQuantity: 9,
        },
        {
          id: "20",
          name: "Laptop Cooling Pad",
          description: "Keeps your laptop cool.",
          size: "Standard",
          price: 3499,
          image: "/assets/images/coolingpad.jpg",
          stockStatus: "In Stock",
          stockQuantity: 14,
        },
      ];
      setProducts(dummyData);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('products-section')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  const renderPaginationButton = (page: number, isActive: boolean) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`
        relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 
        transform hover:scale-105 active:scale-95
        ${isActive 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
        }
      `}
    >
      {page}
      {isActive && (
        <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>
      )}
    </button>
  );

  if (isLoading) {
    return (
      <section id="products-section" className="px-4 py-6 md:px-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-8 animate-pulse"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl h-48 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="products-section" className="hidden md:block px-4 py-6 md:px-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 md:p-8">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
                  Our Products
                </h2>
                <p className="text-blue-100 text-center text-sm md:text-base">
                  Discover our amazing collection of {products.length} premium products
                </p>
              </div>
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Products grid */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {paginatedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="transform transition-all duration-300 hover:scale-102"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/*Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <div className="flex flex-col items-center gap-4">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1}-{Math.min(startIndex + productsPerPage, products.length)} of {products.length} products
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {/* Previous button */}
                      <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`
                          px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                          ${currentPage === 1 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        Previous
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => 
                        renderPaginationButton(page, currentPage === page)
                      )}

                      {/* Next button */}
                      <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`
                          px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                          ${currentPage === totalPages 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile view */}
      <section className="md:hidden px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Mobile header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-xl font-bold text-white text-center mb-1">
              Our Products
            </h2>
            <p className="text-blue-100 text-center text-sm">
              {products.length} amazing products
            </p>
          </div>
          <div className="p-4">
            <MobileProductGrid />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}