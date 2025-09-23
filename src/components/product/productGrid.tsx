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
  subcategoryCode?: string;
};

type ApiProduct = {
  product_code: string;
  productVarient_code: string;
  product_name: string;
  size: string;
  barcode: string;
  shop_id: string;
  mCategory_code: string;
  sCategory_code: string;
  product_description: string;
  image_url: string;
  selling_price: number;
  total_quantity: number;
  quantity_type: string | null;
  discount_percentage: number;
  is_discount_active: boolean;
  discountSellingPrice: number;
};

type ProductGroup = {
  selected: Product;
  variants: Product[];
};

interface ProductGridProps {
  selectedSubcategory?: string | null;
  selectedSubcategoryCode?: string | null;
}

export default function ProductGrid({ selectedSubcategory, selectedSubcategoryCode }: ProductGridProps) {
  const [allProductGroups, setAllProductGroups] = useState<ProductGroup[]>([]);
  const [filteredProductGroups, setFilteredProductGroups] = useState<ProductGroup[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 10;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://plaza.verveautomation.com/api/auth/GetAllProducts");
        const data = await res.json();

        const grouped = new Map<string, ApiProduct[]>();
        (data.formattedProducts || []).forEach((item: ApiProduct) => {
          const group = grouped.get(item.product_code) || [];
          group.push(item);
          grouped.set(item.product_code, group);
        });

        const formatted: ProductGroup[] = Array.from(grouped.values()).map((variants) => {
          const mappedVariants: Product[] = variants.map((item) => ({
            id: item.productVarient_code,
            name: item.product_name,
            description: item.product_description,
            size: item.size,
            price: item.selling_price,
            image: item.image_url || "/assets/images/default.jpg",
            stockStatus: item.total_quantity > 0 ? "In Stock" : "Out of Stock",
            stockQuantity: item.total_quantity,
            subcategoryCode: item.sCategory_code,
          }));

          return {
            selected: mappedVariants[0],
            variants: mappedVariants,
          };
        });

        setAllProductGroups(formatted);
        setFilteredProductGroups(formatted);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filter products when selectedSubcategoryCode changes
  useEffect(() => {
    if (!selectedSubcategoryCode) {
      setFilteredProductGroups(allProductGroups);
    } else {
      const filtered = allProductGroups.filter(group => 
        group.selected.subcategoryCode === selectedSubcategoryCode
      );
      setFilteredProductGroups(filtered);
    }
    setCurrentPage(1); // Reset to first page when filtering
  }, [selectedSubcategoryCode, allProductGroups]);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginated = filteredProductGroups.slice(startIndex, startIndex + productsPerPage);
  const totalPages = Math.ceil(filteredProductGroups.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById("products-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const renderPaginationButton = (page: number, isActive: boolean) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95
        ${
          isActive
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md"
        }
      `}
    >
      {page}
      {isActive && <div className="absolute inset-0 bg-white/20 rounded-lg animate-pulse"></div>}
    </button>
  );

  const getDisplayTitle = () => {
    if (selectedSubcategory) {
      return `${selectedSubcategory} Products`;
    }
    return "Our Products";
  };

  const getDisplayDescription = () => {
    if (selectedSubcategory) {
      if (filteredProductGroups.length === 0) {
        return `No products available in ${selectedSubcategory}`;
      }
      return `Discover ${filteredProductGroups.length} products in ${selectedSubcategory}`;
    }
    return `Discover our amazing collection of ${filteredProductGroups.length} premium products`;
  };

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
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 md:p-8">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
                  {getDisplayTitle()}
                </h2>
                <p className="text-blue-100 text-center text-sm md:text-base">
                  {getDisplayDescription()}
                </p>
              </div>
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            <div className="p-4 md:p-6">
              {filteredProductGroups.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📦</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Items Available</h3>
                  <p className="text-gray-500">
                    {selectedSubcategory 
                      ? `No products found in ${selectedSubcategory} category.`
                      : "No products available at the moment."
                    }
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {paginated.map((group, index) => (
                      <div
                        key={group.selected.id}
                        className="product-card-animate transform transition-all duration-300 hover:scale-102"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ProductCard productGroup={group} />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-10 pt-6 border-t border-gray-100">
                      <div className="flex flex-col items-center gap-4">
                        <div className="text-sm text-gray-600">
                          Showing {startIndex + 1}-
                          {Math.min(startIndex + productsPerPage, filteredProductGroups.length)} of{" "}
                          {filteredProductGroups.length} products
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          <button
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              currentPage === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            Previous
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
                            renderPaginationButton(page, currentPage === page)
                          )}
                          <button
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                              currentPage === totalPages
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          .product-card-animate {
            animation: fadeInUp 0.6s ease-out forwards;
          }
          
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
      </section>

      <section className="md:hidden">
        <MobileProductGrid />
      </section>
    </>
  );
}