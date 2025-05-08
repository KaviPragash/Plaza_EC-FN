import OrderItems from '@/components/order/OrderItems';
import OrderSummary from '@/components/order/OrderSummary';

export default function OrderPage() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-[65%_35%] gap-8">
      <OrderItems />
      <OrderSummary />
    </div>
  );
}
