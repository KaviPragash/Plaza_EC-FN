"use client";

import { useEffect, useState } from "react";
import HeroSlide from "./heroSlide";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, image: "/assets/images/banner1.jpg" },
  { id: 2, image: "/assets/images/banner2.jpg" },
  { id: 3, image: "/assets/images/banner3.jpg" },
  { id: 4, image: "/assets/images/banner4.jpg" },
  { id: 5, image: "/assets/images/banner5.jpg" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-[220px] md:h-[450px] overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <HeroSlide key={slide.id} image={slide.image} />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full shadow-md hover:bg-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full shadow-md hover:bg-white"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
