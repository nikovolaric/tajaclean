"use client";

import { deleteDiscount } from "@/lib/discountActions";
import { Pencil, RefreshCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function DiscountCard({
  discount,
}: {
  discount: { name: string; used: string; valid_until: string; id: string };
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await deleteDiscount(discount.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-[6fr_4fr_5fr_2fr] items-center justify-items-center rounded-xl bg-white py-4 text-sm shadow-sm">
      <p className="text-center font-semibold">{discount.name}</p>
      <p className="text-secondary text-center font-medium">
        {discount.valid_until
          ? new Date(discount.valid_until).toLocaleDateString("sl-SI", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "do preklica"}
      </p>
      <p className="text-center text-sm font-semibold">{discount.used}</p>
      <div className="flex items-center gap-5">
        <Link href={{ query: { id: discount.id } }}>
          <Pencil className="h-5 stroke-2" />
        </Link>
        {isLoading ? (
          <RefreshCcw className="h-5 animate-spin" />
        ) : (
          <Trash2
            className="h-5 cursor-pointer stroke-2"
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default DiscountCard;
