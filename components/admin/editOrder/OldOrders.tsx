"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { OrderCard } from "../orders/OrdersPage";

function OldOrders({
  orders,
}: {
  orders: {
    id: string;
    created_at: string;
    buyer: { firstName: string; lastName: string };
    status: string;
    total_price: number;
    paid: boolean;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="text-primary absolute top-4 right-4 cursor-pointer p-1 text-xs hover:underline"
        onClick={() => setIsOpen(true)}
      >
        Pretekla naročila
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 z-[999] h-dvh w-dvw bg-black/50">
          <div className="relative mx-auto mt-20 flex max-w-5xl flex-col gap-6 rounded-lg bg-white p-8 shadow-xs">
            <X
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            <p className="text-lg font-medium">
              Pretekla naročila:{" "}
              {`${orders[0].buyer.firstName} ${orders[0].buyer.lastName}`}
            </p>
            <div className="flex h-[70dvh] flex-col gap-4 overflow-y-scroll">
              {orders.map((order, i: number) => (
                <OrderCard key={`${order.id}${i}`} order={order} i={i} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OldOrders;
