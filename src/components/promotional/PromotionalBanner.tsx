"use client";

import { useEffect, useState } from "react";
import PromotionalCard from './PromotionalCard';

interface PromotionalData {
  id: number;
  image: string;
  theme: 'blackfriday' | 'backtoschool' | 'endofseason';
}

export default function PromotionalBanner() {
  const promotionalData: PromotionalData[] = [
    {
      id: 1,
      image: "/assets/images/promotional03.png",
      theme: "blackfriday"
    },
    {
      id: 2,
      image: "/assets/images/promotional02.jpg",
      theme: "backtoschool"
    },
    {
      id: 3,
      image: "/assets/images/promotional01.png",
      theme: "endofseason"
    }
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="px-4 py-8">
      <div className="w-full mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fadeIn">
            Special Offers
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Don&rsquo;t miss out on these amazing deals
          </p>
        </div>

        {isMobile ? (
          <div
            className="flex gap-4 overflow-x-auto px-1 scrollbar-hide"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {promotionalData.map((promo) => (
              <div
                key={promo.id}
                className="flex-none w-[90%] scroll-snap-align-start"
              >
                <PromotionalCard image={promo.image} theme={promo.theme} />
              </div>
            ))}
          </div>
        ) : (
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {promotionalData.map((promo, index) => (
              <div
                key={promo.id}
                className="w-full h-full transform hover:scale-105 transition-all duration-300"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <PromotionalCard image={promo.image} theme={promo.theme} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
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

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
}
