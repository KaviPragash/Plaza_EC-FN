"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import MobileProductModal from "./MobileProductModal";

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

type ProductGroup = {
  selected: Product;
  variants: Product[];
};

export default function MobileProductCard({
  productGroup,
}: {
  productGroup: ProductGroup;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-md shadow-sm p-2 flex flex-col justify-between items-center text-center border border-gray-200 h-full">
        <img
          src={productGroup.selected.image}
          alt={productGroup.selected.name}
          className="w-full h-28 object-contain mb-2 rounded"
        />
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
          {productGroup.selected.name}
        </h3>

        <div className="flex flex-col items-center gap-1 mt-auto">
          <p className="text-sm font-semibold text-blue-600">
            LKR {productGroup.selected.price.toFixed(2)}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md transition flex items-center"
          >
            View Details
            <Eye size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {showModal && (
        <MobileProductModal
          productGroup={productGroup}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
