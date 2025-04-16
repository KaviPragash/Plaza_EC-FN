"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

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

  useEffect(() => {
    const dummyData: Product[] = [
      {
        id: "1",
        name: "Wireless Headphones",
        description: "High-quality sound with noise cancellation.",
        size: "Standard",
        price: 12999,
        image: "/images/headphones.jpg",
        stockStatus: "In Stock",
        stockQuantity: 12,
      },
      {
        id: "2",
        name: "Smartwatch",
        description: "Track fitness and receive notifications.",
        size: "Universal",
        price: 8999,
        image: "/images/smartwatch.jpg",
        stockStatus: "In Stock",
        stockQuantity: 5,
      },
      {
        id: "3",
        name: "Bluetooth Speaker",
        description: "Portable speaker with rich bass.",
        size: "Medium",
        price: 5999,
        image: "/images/speaker.jpg",
        stockStatus: "In Stock",
        stockQuantity: 8,
      },
      {
        id: "4",
        name: "Gaming Mouse",
        description: "Precision mouse with RGB lighting.",
        size: "Compact",
        price: 3499,
        image: "/images/mouse.jpg",
        stockStatus: "In Stock",
        stockQuantity: 4,
      },
    ];
    setProducts(dummyData);
  }, []);

  return (
    <section className="px-4 md:px-6 pt-0 pb-6">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 text-center">
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
