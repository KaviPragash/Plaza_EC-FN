"use client";

import { useState, useEffect } from "react";
import MobileProductCard from "./MobileProductCard";

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

type ApiProduct = {
  product_code: string;
  productVarient_code: string;
  product_name: string;
  size: string;
  barcode: string;
  shop_id: string;
  mCategory_code: string;
  sCategory_code: string;
  product_description: string;
  image_url: string;
  selling_price: number;
  total_quantity: number;
  quantity_type: string | null;
  discount_percentage: number;
  is_discount_active: boolean;
  discountSellingPrice: number;
};

type ProductGroup = {
  selected: Product;
  variants: Product[];
};

export default function MobileProductGrid() {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://plaza.verveautomation.com/api/auth/GetAllProducts");
        const data = await res.json();

        const grouped = new Map<string, ApiProduct[]>();

        (data.formattedProducts || []).forEach((item: ApiProduct) => {
          const group = grouped.get(item.product_code) || [];
          group.push(item);
          grouped.set(item.product_code, group);
        });

        const formattedGroups: ProductGroup[] = Array.from(grouped.values()).map((variants) => {
          const productVariants: Product[] = variants.map((item) => ({
            id: item.productVarient_code,
            name: item.product_name,
            description: item.product_description,
            size: item.size,
            price: item.selling_price,
            image: item.image_url || "/assets/images/default.jpg",
            stockStatus: item.total_quantity > 0 ? "In Stock" : "Out of Stock",
            stockQuantity: item.total_quantity,
          }));

          return {
            selected: productVariants[0],
            variants: productVariants,
          };
        });

        setProductGroups(formattedGroups);
      } catch (err) {
        console.error("Failed to fetch mobile products:", err);
      }
    }

    fetchProducts();
  }, []);

  const visibleGroups = showAll ? productGroups : productGroups.slice(0, 12);

  return (
    <section className="block md:hidden px-2 py-4">
      <div className="grid grid-cols-3 gap-2">
        {visibleGroups.map((group) => (
          <MobileProductCard key={group.selected.id} productGroup={group} />
        ))}
      </div>

      {!showAll && productGroups.length > 12 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(true)}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Read More
          </button>
        </div>
      )}
    </section>
  );
}
