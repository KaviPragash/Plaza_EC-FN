type Product = {
    id: string;
    name: string;
    image: string;
    price: number;
  };
  
  export default function TrendingCard({ product }: { product: Product }) {
    return (
      <div className="min-w-[180px] sm:min-w-[200px] bg-white border rounded-lg p-4 shadow-sm flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-36 object-contain rounded mb-2"
        />
        <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
        <p className="text-blue-600 font-bold text-sm mt-1">
          LKR {product.price.toFixed(2)}
        </p>
        <a href={`/products/${product.id}`}>
          <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 rounded transition">
            View Product
          </button>
        </a>
      </div>
    );
  }
  