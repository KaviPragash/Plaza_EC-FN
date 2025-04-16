"use client";

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

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded mb-4"
        />

        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-1">Size: {product.size}</p>
        <p className="text-sm text-gray-600 mb-1">Stock: {product.stockStatus}</p>
        <p className="text-sm text-gray-600 mb-1">Available: {product.stockQuantity}</p>
        <p className="text-blue-600 font-bold text-md mb-3">
          LKR {product.price.toFixed(2)}
        </p>

        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            defaultValue={1}
            className="w-20 px-2 py-1 border border-gray-300 rounded"
          />
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded">
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
}
