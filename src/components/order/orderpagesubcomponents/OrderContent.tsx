"use client";

import OrderItems from '@/components/order/OrderItems';
import OrderSummary from '@/components/order/OrderSummary';
import HelpSupportCard from './HelpSupportCard';

export default function OrderContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8">
      <OrderItems />
      <div className="space-y-8">
        <OrderSummary />
        <HelpSupportCard />
      </div>
    </div>
  );
}