"use client";

import { useState, useEffect } from "react";
import MobileProductCard from "./MobileProductCard";

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

export default function MobileProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
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
    ];
    setProducts(dummyData);
  }, []);

  const visibleProducts = showAll ? products : products.slice(0, 12);

  return (
    <section className="block md:hidden px-2 py-4">
      <div className="grid grid-cols-3 gap-2">
        {visibleProducts.map((product) => (
          <MobileProductCard key={product.id} product={product} />
        ))}
      </div>

      {!showAll && products.length > 12 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Read More
          </button>
        </div>
      )}
    </section>
  );
}
