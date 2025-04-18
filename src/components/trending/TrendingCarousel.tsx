"use client";

import { useRef, useState, useEffect } from "react";
import TrendingCard from "./TrendingCard";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export default function TrendingCarousel({ products }: { products: Product[] }) {
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
        setCardWidth(cardRef.current.offsetWidth + 16); 
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Trending Products</h2>
        <div className="flex gap-2">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-200 shadow transition"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-200 shadow transition"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-1 pr-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={index === 0 ? cardRef : null}
            className="flex-shrink-0"
          >
            <TrendingCard product={product} />
          </div>
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
