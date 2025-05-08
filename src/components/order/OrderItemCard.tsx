"use client";

import { Product } from "@/contexts/CartContext";
import QuantitySelector from "@/components/product/QuantitySelector";
import { useCart } from "@/contexts/CartContext";

type OrderItemCardProps = {
  product: Product;
};

export default function OrderItemCard({ product }: OrderItemCardProps) {
  const { addToCart } = useCart();
  const { name, price, quantity, image } = product;
  
  const handleIncrease = () => {
    addToCart({ ...product, quantity: 1 });
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      addToCart({ ...product, quantity: -1 });
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-50 flex items-center p-4 hover:shadow-md transition-all duration-300">
      {/* Product Image with enhanced presentation */}
      <div className="mr-5">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 ring-2 ring-gray-100 ring-offset-1">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Product Details with improved typography */}
      <div className="flex-grow">
        <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500 mt-1">
          Price: <span className="text-gray-600">LKR {price.toFixed(2)}</span>
        </p>
        <p className="text-sm font-bold flex items-center mt-1">
          <span className="text-gray-700">Total:</span>
          <span className="text-blue-600 ml-1">LKR {totalPrice.toFixed(2)}</span>
        </p>
      </div>

      {/* Quantity Selector */}
      <div>
        <QuantitySelector
          quantity={quantity}
          increase={handleIncrease}
          decrease={handleDecrease}
        />
      </div>
    </div>
  );
}