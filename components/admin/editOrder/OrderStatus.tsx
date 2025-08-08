"use client";

import { updateOrderStatus } from "@/lib/orderActions";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function OrderStatus({ status, id }: { status: string; id: number }) {
  const [curStatus, setCurStatus] = useState(status);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);
      await updateOrderStatus({ id, status: curStatus });
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Status naročila</p>
      <div
        className={`relative flex items-center gap-6 self-start ${isOpen ? "rounded-t-xl" : "rounded-xl"} bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]`}
      >
        <p className="rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-center text-xs font-medium shadow-sm">
          {curStatus}
        </p>
        <ChevronDown
          className={`w-6 cursor-pointer stroke-2 ${isOpen ? "rotate-180" : ""}`}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        />
        {curStatus !== status && (
          <button
            className="bg-primary cursor-pointer rounded-md px-4 py-1 font-medium text-white shadow-sm disabled:cursor-not-allowed disabled:bg-gray-400"
            disabled={isLoading}
            onClick={handleClick}
          >
            {isLoading ? "..." : "Shrani"}
          </button>
        )}
        {isOpen && (
          <div className="absolute top-full left-0 z-10 flex w-full flex-col gap-2 rounded-b-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
            {curStatus !== "Zaključeno" && (
              <p
                className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                onClick={() => setCurStatus("Zaključeno")}
              >
                Zaključeno
              </p>
            )}{" "}
            {curStatus !== "V obdelavi" && (
              <p
                className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                onClick={() => setCurStatus("V obdelavi")}
              >
                V obdelavi
              </p>
            )}
            {curStatus !== "Nepregledano" && (
              <p
                className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                onClick={() => setCurStatus("Nepregledano")}
              >
                Nepregledano
              </p>
            )}
            {curStatus !== "Preklicano" && (
              <p
                className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                onClick={() => setCurStatus("Preklicano")}
              >
                Preklicano
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderStatus;
