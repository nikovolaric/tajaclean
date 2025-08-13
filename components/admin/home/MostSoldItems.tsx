"use client";

import Spinner from "@/components/Spinner";
import { getTopProductsByMonth } from "@/lib/orderActions";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function MostSoldItems() {
  const months = [];
  const now = new Date();

  const [items, setItems] = useState([]);
  const [month, setMonth] = useState({
    text: `${now.toLocaleDateString("sl-SI", { month: "long" })} ${now.getFullYear()}`,
    ym: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const monthNames = [
    "januar",
    "februar",
    "marec",
    "april",
    "maj",
    "junij",
    "julij",
    "avgust",
    "september",
    "oktober",
    "november",
    "december",
  ];

  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const year = d.getFullYear();
    const monthNum = String(d.getMonth() + 1).padStart(2, "0");
    const monthText = `${monthNames[d.getMonth()]} ${year}`;

    months.push({
      ym: `${year}-${monthNum}`,
      text: monthText,
    });
  }

  useEffect(
    function () {
      async function getData() {
        setIsloading(true);
        try {
          const data = await getTopProductsByMonth(new Date(month.ym));

          setItems(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsloading(false);
        }
      }

      getData();
    },
    [month],
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Najbolj prodajani izdelki</p>
      <div className="flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        <div className="relative">
          <p className="flex items-center gap-4 font-medium capitalize">
            {month.text}{" "}
            <ChevronDown
              className="cursor-pointer"
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            />
          </p>
          {isOpen && (
            <div className="absolute flex w-full flex-col gap-2 rounded-lg border-black/25 bg-white p-4 shadow-xs">
              {months.map((el) => (
                <button
                  key={el.ym}
                  className="cursor-pointer rounded-md border border-black/25 px-1.5 text-center text-xs font-medium capitalize shadow-sm"
                  onClick={() => {
                    setMonth(el);
                    setIsOpen(false);
                  }}
                >
                  {el.text}
                </button>
              ))}
            </div>
          )}
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          items.map((el: { product_name: string; total_price: number }) => (
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
          ))
        )}
      </div>
    </div>
  );
}

export default MostSoldItems;
