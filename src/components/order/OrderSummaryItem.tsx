"use client";

import { Package } from "lucide-react";

type Props = {
  name: string;
  quantity: number;
  total: number;
};

export default function OrderSummaryItem({ name, quantity, total }: Props) {
  return (
    <div className="flex items-center gap-3 py-2 group hover:bg-gray-50 rounded-lg px-2 transition-colors">
      {/* Item icon */}
      <div className="bg-blue-100 rounded-full p-1 flex-shrink-0">
        <Package size={14} className="text-blue-600" />
      </div>
      
      {/* Item details */}
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-center">
          <p className="font-medium text-gray-800 truncate text-sm">{name}</p>
          <p className="font-semibold text-blue-600 text-sm ml-2 flex-shrink-0">
            LKR {total.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full">
            x{quantity}
          </span>
          <span className="ml-1">
            @ LKR {(total / quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}