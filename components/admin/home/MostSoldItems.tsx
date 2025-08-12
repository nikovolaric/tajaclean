"use client";

import { getTopProductsByMonth } from "@/lib/orderActions";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function MostSoldItems() {
  const [items, setItems] = useState([]);

  useEffect(function () {
    async function getData() {
      const data = await getTopProductsByMonth();

      setItems(data);
    }

    getData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Najbolj prodajani izdelki</p>
      <div className="flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        <p className="flex items-center gap-4 font-medium">
          Avgust 2025 <ChevronDown className="cursor-pointer" />
        </p>
        {items.map((el: { product_name: string; total_price: number }) => (
          <div
            key={el.product_name}
            className="flex items-center justify-between rounded-xl border border-[#ADADAD]/50 p-4 text-sm font-medium shadow-xs"
          >
            <p>{el.product_name}</p>
            <p className="rounded-md border border-[#ADADAD]/50 p-1 shadow-xs">
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(el.total_price)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MostSoldItems;
