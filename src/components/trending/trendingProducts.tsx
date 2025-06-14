"use client";

import TrendingCarousel from "./TrendingCarousel";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  size: string;
  stockStatus: string;
  stockQuantity: number;
};

type ProductGroup = {
  selected: Product;
  variants: Product[];
};

const trendingProductGroups: ProductGroup[] = [
  {
    selected: {
      id: "1",
      name: "Wireless Headphones",
      image: "/assets/images/headphones.webp",
      price: 12999,
      description: "High-quality wireless headphones",
      size: "Standard",
      stockStatus: "In Stock",
      stockQuantity: 25,
    },
    variants: [
      {
        id: "1",
        name: "Wireless Headphones",
        image: "/assets/images/headphones.webp",
        price: 12999,
        description: "High-quality wireless headphones",
        size: "Standard",
        stockStatus: "In Stock",
        stockQuantity: 25,
      },
    ],
  },
  {
    selected: {
      id: "2",
      name: "Smartwatch",
      image: "/assets/images/smartwatch.jpg",
      price: 8999,
      description: "Smartwatch with multiple features",
      size: "One Size",
      stockStatus: "In Stock",
      stockQuantity: 30,
    },
    variants: [
      {
        id: "2",
        name: "Smartwatch",
        image: "/assets/images/smartwatch.jpg",
        price: 8999,
        description: "Smartwatch with multiple features",
        size: "One Size",
        stockStatus: "In Stock",
        stockQuantity: 30,
      },
    ],
  },
  {
    selected: {
      id: "3",
      name: "Bluetooth Speaker",
      image: "/assets/images/speaker.jpg",
      price: 5999,
      description: "Portable Bluetooth speaker",
      size: "Medium",
      stockStatus: "In Stock",
      stockQuantity: 20,
    },
    variants: [
      {
        id: "3",
        name: "Bluetooth Speaker",
        image: "/assets/images/speaker.jpg",
        price: 5999,
        description: "Portable Bluetooth speaker",
        size: "Medium",
        stockStatus: "In Stock",
        stockQuantity: 20,
      },
    ],
  },
  {
    selected: {
      id: "4",
      name: "Gaming Mouse",
      image: "/assets/images/mouse.jpg",
      price: 3499,
      description: "Ergonomic gaming mouse",
      size: "One Size",
      stockStatus: "In Stock",
      stockQuantity: 50,
    },
    variants: [
      {
        id: "4",
        name: "Gaming Mouse",
        image: "/assets/images/mouse.jpg",
        price: 3499,
        description: "Ergonomic gaming mouse",
        size: "One Size",
        stockStatus: "In Stock",
        stockQuantity: 50,
      },
    ],
  },
];

export default function TrendingProducts() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
      <TrendingCarousel products={trendingProductGroups} />
    </section>
  );
}
