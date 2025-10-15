"use client";

import { deletePayment } from "@/lib/paymentActions";
import { RefreshCcw, Trash2 } from "lucide-react";
import { useState } from "react";

function PaymentCard({
  payment,
  i,
}: {
  payment: {
    created_at: string;
    id: number;
    sumup_id: string;
    buyer_name: string;
    total: number;
    email: string;
  };
  i: number;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deletePayment({ id: payment.id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div
      className={`grid grid-cols-[3fr_2fr_2fr_3fr_3fr_1fr] items-center justify-items-center rounded-xl py-4 text-sm shadow-sm ${i % 2 === 0 ? "bg-[#e4ebe3]" : "bg-white"}`}
    >
      <p className="text-secondary text-center font-medium">
        {new Date(payment.created_at).toLocaleDateString("sl-SI", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Ljubljana",
        })}
      </p>
      <p className="text-center text-sm font-medium">{payment.buyer_name}</p>
      <p className="text-center text-sm font-semibold">
        {new Intl.NumberFormat("sl-SI", {
          style: "currency",
          currency: "EUR",
        }).format(payment.total)}
      </p>
      <p className="text-center text-sm font-medium">{payment.sumup_id}</p>
      <p className="text-center text-sm font-medium">
        {payment.email || "anamarija.volaric@gmail.com"}
      </p>
      {isDeleting ? (
        <RefreshCcw className="h-6 animate-spin cursor-not-allowed" />
      ) : (
        <Trash2 className="h-6 cursor-pointer" onClick={handleDelete} />
      )}
    </div>
  );
}

export default PaymentCard;
