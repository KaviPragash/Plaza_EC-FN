import TrendingCarousel from "./TrendingCarousel";

const trendingProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "/assets/images/headphones.webp",
    price: 12999,
  },
  {
    id: "2",
    name: "Smartwatch",
    image: "/assets/images/smartwatch.jpg",
    price: 8999,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    image: "/assets/images/speaker.jpg",
    price: 5999,
  },
  {
    id: "4",
    name: "Gaming Mouse",
    image: "/assets/images/mouse.jpg",
    price: 3499,
  },
  {
    id: "5",
    name: "Fitness Tracker",
    image: "/assets/images/fitness.png",
    price: 6999,
  },
  {
    id: "6",
    name: "Smart Glasses",
    image: "/assets/images/smartglasses.jpg",
    price: 8999,
  },
  {
    id: "7",
    name: "Portable Projector",
    image: "/assets/images/projector.jpg",
    price: 17999,
  },
  {
    id: "8",
    name: "Wireless Keyboard",
    image: "/assets/images/keyboard.webp",
    price: 4999,
  },
];

export default function TrendingProducts() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
      <TrendingCarousel products={trendingProducts} />
    </section>
  );
}
