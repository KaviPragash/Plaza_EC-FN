import TrendingCarousel from "./TrendingCarousel";

const trendingProducts = [
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
  {
    id: "5",
    name: "Fitness Tracker",
    image: "/assets/images/fitness.png",
    price: 6999,
    description: "Fitness tracker with heart rate monitor",
    size: "One Size",
    stockStatus: "In Stock",
    stockQuantity: 40,
  },
  {
    id: "6",
    name: "Smart Glasses",
    image: "/assets/images/smartglasses.jpg",
    price: 8999,
    description: "Smart AR glasses",
    size: "One Size",
    stockStatus: "Pre-Order",
    stockQuantity: 15,
  },
  {
    id: "7",
    name: "Portable Projector",
    image: "/assets/images/projector.jpg",
    price: 17999,
    description: "Portable projector for movies",
    size: "Standard",
    stockStatus: "In Stock",
    stockQuantity: 10,
  },
  {
    id: "8",
    name: "Wireless Keyboard",
    image: "/assets/images/keyboard.webp",
    price: 4999,
    description: "Wireless keyboard with backlight",
    size: "Standard",
    stockStatus: "In Stock",
    stockQuantity: 60,
  },
];


export default function TrendingProducts() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
      <TrendingCarousel products={trendingProducts} />
    </section>
  );
}
