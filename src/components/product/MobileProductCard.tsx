"use client";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function MobileProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-md shadow-sm p-2 flex flex-col justify-between items-center text-center border border-gray-200 h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-28 object-contain mb-2 rounded"
      />
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{product.name}</h3>

      <div className="flex flex-col items-center gap-1 mt-auto">
        <p className="text-sm font-semibold text-blue-600">LKR {product.price.toFixed(2)}</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
