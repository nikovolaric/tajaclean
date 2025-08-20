"use client";

import { deleteDiscount } from "@/lib/discountActions";
import { Pencil, RefreshCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function DiscountCard({
  discount,
  i,
}: {
  discount: {
    person_name: string;
    name: string;
    used: string;
    valid_until: string;
    id: string;
    value: number;
  };
  i: number;
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
    <div
      className={`grid grid-cols-[4fr_4fr_2fr_2fr_2fr_2fr] items-center justify-items-center rounded-xl py-4 text-sm shadow-sm ${i % 2 === 0 ? "bg-[#e4ebe3]" : "bg-white"}`}
    >
      <p className="justify-self-start px-2 font-semibold">
        {discount.person_name}
      </p>
      <p className="justify-self-start px-2 font-semibold">{discount.name}</p>
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
      <p className="text-center text-sm font-semibold">
        {new Intl.NumberFormat("sl-SI", { style: "percent" }).format(
          discount.value,
        )}
      </p>
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
