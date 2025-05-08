"use client";

type Props = {
  name: string;
  quantity: number;
  total: number;
};

export default function OrderSummaryItem({ name, quantity, total }: Props) {
  return (
    <div className="flex justify-between items-center text-sm p-2 border-b">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-gray-500">Quantity: {quantity}</p>
      </div>
      <p className="font-semibold text-blue-600">
        LKR {total.toFixed(2)}
      </p>
    </div>
  );
}
