interface QuantitySelectorProps {
    quantity: number;
    increase: () => void;
    decrease: () => void;
  }
  
  export default function QuantitySelector({ quantity, increase, decrease }: QuantitySelectorProps) {
    return (
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={decrease}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          −
        </button>
        <span className="text-sm font-medium">{quantity}</span>
        <button
          onClick={increase}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          +
        </button>
      </div>
    );
  }
  