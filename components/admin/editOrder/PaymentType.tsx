"use client";

import { updateOrderStatus } from "@/lib/orderActions";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function PaymentType({
  paymentMethod,
  notes,
  paid,
  id,
  sumupId,
}: {
  paymentMethod: string;
  notes?: string;
  paid: string;
  id: number;
  sumupId?: string;
}) {
  const [curStatus, setCurStatus] = useState(paid);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);
      await updateOrderStatus({ id, paid: curStatus });
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-x-5 gap-y-5">
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">Način plačila</p>
        <div className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-sm font-medium">
            {paymentMethod === "proforma"
              ? "Predračun"
              : paymentMethod === "paypal"
                ? "PayPal"
                : paymentMethod === "povzetje"
                  ? "Po povzetju"
                  : "Spletno plačilo"}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">Opombe</p>
        <div className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-sm font-medium">{notes ? notes : "Ni opombe."}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-xl font-semibold">Plačilo</p>
        <div
          className={`relative flex items-center gap-6 ${isOpen ? "rounded-t-xl" : "rounded-xl"} bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]`}
        >
          <p className="text-sm font-medium">{curStatus}</p>
          <ChevronDown
            className={`w-6 cursor-pointer stroke-2 ${isOpen ? "rotate-180" : ""}`}
            onClick={() => setIsOpen((isOpen) => !isOpen)}
          />
          {curStatus !== paid && (
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
              {curStatus === "Plačano" && (
                <>
                  <p
                    className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                    onClick={() => {
                      setCurStatus("Neplačano");
                      setIsOpen(false);
                    }}
                  >
                    Neplačano
                  </p>
                  <p
                    className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                    onClick={() => {
                      setCurStatus("Vračilo");
                      setIsOpen(false);
                    }}
                  >
                    Vračilo
                  </p>
                </>
              )}{" "}
              {curStatus === "Neplačano" && (
                <>
                  <p
                    className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                    onClick={() => {
                      setCurStatus("Plačano");
                      setIsOpen(false);
                    }}
                  >
                    Plačano
                  </p>
                  <p
                    className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                    onClick={() => {
                      setCurStatus("Vračilo");
                      setIsOpen(false);
                    }}
                  >
                    Vračilo
                  </p>
                </>
              )}
              {curStatus === "Vračilo" && (
                <>
                  <p
                    className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                    onClick={() => {
                      setCurStatus("Plačano");
                      setIsOpen(false);
                    }}
                  >
                    Plačano
                  </p>
                  <p
                    className="w-fit cursor-pointer rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-xs font-medium shadow-sm"
                    onClick={() => {
                      setCurStatus("Neplačano");
                      setIsOpen(false);
                    }}
                  >
                    Neplačano
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {sumupId && (
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold">SumUp ID</p>
          <div className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
            <p className="text-sm font-medium">{sumupId}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentType;
