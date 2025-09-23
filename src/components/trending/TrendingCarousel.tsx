"use client";

import { useRef, useState, useEffect } from "react";
import ProductCard from "../product/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  size: string;
  stockStatus: string;
  stockQuantity: number;
};

export type ProductGroup = {
  selected: Product;
  variants: Product[];
};

export default function TrendingCarousel({ products }: { products: ProductGroup[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [cardWidth, setCardWidth] = useState(0);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    const resizeObserver = new ResizeObserver(() => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth + 12);
      }
    });

    if (el) {
      el.addEventListener("scroll", checkScroll);
      resizeObserver.observe(el);
    }

    return () => {
      el?.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-rose-500 via-purple-600 to-blue-500 bg-clip-text text-transparent animate-fadeIn">
              Trending Products
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Hot picks that everyone&apos;s talking about
            </p>
          </div>

          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/95 hover:bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200 backdrop-blur-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/95 hover:bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border border-gray-200 backdrop-blur-sm"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((group, index) => (
                <div
                  key={group.selected.id}
                  ref={index === 0 ? cardRef : null}
                  className="flex-none w-36 sm:w-40 md:w-44 transform hover:scale-105 transition-all duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideInRight 0.6s ease-out forwards",
                  }}
                >
                  <ProductCard productGroup={group} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-gray-400 hover:bg-gray-600 transition-colors duration-300"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}
