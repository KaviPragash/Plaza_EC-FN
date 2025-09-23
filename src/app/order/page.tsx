"use client";

import OrderHeader from '@/components/order/orderpagesubcomponents/OrderHeader';
import OrderBanner from '@/components/order/orderpagesubcomponents/OrderBanner';
import OrderStatusTracker from '@/components/order/orderpagesubcomponents/OrderStatusTracker';
import OrderContent from '@/components/order/orderpagesubcomponents/OrderContent';
import TrustBadges from '@/components/order/orderpagesubcomponents/TrustBadges';
import TrendingProducts from '@/components/trending/trendingProducts';
import { useState } from 'react';

// Import the OrderStatus type from OrderStatusTracker or define it here
type OrderStatus = "item_selected" | "checkout" | "purchase_confirmed";

export default function OrderPage() {
  // Explicitly type the state variable with OrderStatus
  const [orderStatus] = useState<OrderStatus>("checkout");
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button and Order ID Banner */}
      <OrderBanner />

      {/* Page Header */}
      <OrderHeader />

      <div className="container mx-auto px-4 pb-16">
        {/* Order Status Tracker */}
        <div className="mb-8">
          <OrderStatusTracker orderStatus={orderStatus} />
        </div>

        {/* Main Order Content */}
        <OrderContent />
        
        {/* Trust Badges */}
        <div className="mt-8">
          <TrustBadges />
        </div>
        
        {/* Trending Products */}
        <div className="mt-12">
          <TrendingProducts />
        </div>
      </div>
    </div>
  );
}