"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import NewOrderCard from "./NewOrderCard";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Search,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Spinner from "@/components/Spinner";

function OrdersPage() {
  type Order = {
    id: string;
    created_at: string;
    buyer: { firstName: string; lastName: string };
    total_price: number;
    status: string;
  };

  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  useEffect(function () {
    async function getNewOrders() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("status", "Nepregledano");

        if (error) {
          throw error;
        }

        setNewOrders(data);
      } catch (error) {
        console.log(error);
      }
    }

    getNewOrders();
  }, []);

  useEffect(
    function () {
      async function getOrders() {
        const supabase = createClient();

        const pageRange = (page - 1) * 30;

        try {
          setIsLoading(true);

          let query = supabase
            .from("orders")
            .select()
            .order("created_at", { ascending: false })
            .range(pageRange, pageRange + 29);

          if (name) {
            const conditions = [
              `buyer->>lastName.ilike.%${name}%`,
              `buyer->>firstName.ilike.%${name}%`,
            ];

            if (!isNaN(Number(name))) {
              conditions.push(`id.eq.${Number(name)}`);
            }

            query = query.or(conditions.join(","));
          }

          if (status) {
            query.eq("status", status);
          }

          const { data, error } = await query;

          if (error) {
            throw error;
          }

          setOrders(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      getOrders();
    },
    [name, status, page],
  );

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-10">
        <SearchBar setName={setName} />
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold">Nepregledana naročila</p>
          {newOrders.length > 0 ? (
            <div className="flex flex-col gap-4">
              {newOrders.map(
                (order: {
                  buyer: { firstName: string; lastName: string };
                  id: string;
                }) => (
                  <NewOrderCard key={order.id} order={order} />
                ),
              )}
            </div>
          ) : (
            <p className="font-medium">Trenutno ni nepregledanih naročil.</p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <NameBar setStatus={setStatus} />
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {orders.map(
                (
                  order: {
                    id: string;
                    created_at: string;
                    buyer: { firstName: string; lastName: string };
                    total_price: number;
                    status: string;
                  },
                  i: number,
                ) => (
                  <OrderCard key={`${order.id}${i}`} order={order} i={i} />
                ),
              )}
            </>
          )}

          <div className="items-cente flex justify-between text-sm">
            {page > 1 && (
              <button
                className="cursor-pointer"
                onClick={() => setPage((p) => p - 1)}
              >
                <ChevronLeft height={16} />
              </button>
            )}
            {orders.length === 30 && (
              <button
                className="cursor-pointer"
                onClick={() => setPage((p) => p + 1)}
              >
                <ChevronRight height={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar({ setName }: { setName: Dispatch<SetStateAction<string>> }) {
  return (
    <div className="flex w-full items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm shadow-xs">
      <Search className="h-5 stroke-2" />
      <input
        placeholder="Iskanje po naročilih"
        onChange={(e) => setName(e.target.value)}
        className="w-full outline-none"
      />
    </div>
  );
}

function NameBar({
  setStatus,
}: {
  setStatus: Dispatch<SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(status: string) {
    setStatus(status);
    setIsOpen(false);
  }

  return (
    <>
      <p className="text-xl font-semibold">Vsa naročila</p>
      <div className="grid grid-cols-[3fr_3fr_4fr_3fr_4fr_2fr] text-sm select-none">
        <p className="w-full rounded-s-lg border border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          ID naročila
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Datum in ura
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Kupec
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Znesek
        </p>
        <div className="relative">
          <p className="flex w-full items-center justify-center gap-4 border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
            Status{" "}
            <ChevronDown
              className={`cursor-pointer ${isOpen ? "rotate-180" : ""}`}
              onClick={() => setIsOpen((isOpen) => !isOpen)}
            />
          </p>
          {isOpen && (
            <div className="absolute flex w-full flex-col gap-2 rounded-lg border border-black/25 bg-white p-4 shadow-xs">
              <button
                className="cursor-pointer rounded-md border border-red-600 px-1.5 text-center text-xs font-medium shadow-sm"
                onClick={() => handleClick("Preklicano")}
              >
                Preklicano
              </button>
              <button
                className="cursor-pointer rounded-md border border-yellow-200 px-1.5 text-center text-xs font-medium shadow-sm"
                onClick={() => handleClick("V obdelavi")}
              >
                V obdelavi
              </button>
              <button
                className="cursor-pointer rounded-md border border-green-600 px-1.5 text-center text-xs font-medium shadow-sm"
                onClick={() => handleClick("Zaključeno")}
              >
                Zaključeno
              </button>
              <button
                className="cursor-pointer rounded-md border border-black/25 px-1.5 text-center text-xs font-medium shadow-sm"
                onClick={() => handleClick("Nepregledano")}
              >
                Nepregledano
              </button>
              <button
                className="cursor-pointer rounded-md px-1.5 text-center text-xs font-medium shadow-sm"
                onClick={() => handleClick("")}
              >
                Vsi
              </button>
            </div>
          )}
        </div>
        <p className="w-full rounded-e-lg border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Uredi
        </p>
      </div>
    </>
  );
}

export function OrderCard({
  order,
  i,
}: {
  order: {
    id: string;
    created_at: string;
    buyer: { firstName: string; lastName: string };
    total_price: number;
    status: string;
  };
  i: number;
}) {
  return (
    <div
      className={`grid grid-cols-[3fr_3fr_4fr_3fr_4fr_2fr] items-center justify-items-center rounded-xl py-4 text-sm shadow-sm ${i % 2 === 0 ? "bg-[#e4ebe3]" : "bg-white"}`}
    >
      <p className="text-center font-semibold">{order.id}</p>
      <p className="text-secondary text-center font-medium">
        {new Date(order.created_at).toLocaleDateString("sl-SI", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="text-center text-sm font-medium">
        {order.buyer.firstName} {order.buyer.lastName}
      </p>
      <p className="text-center text-sm font-semibold">
        {new Intl.NumberFormat("sl-SI", {
          style: "currency",
          currency: "EUR",
        }).format(order.total_price)}
      </p>
      <p
        className={`rounded-md border px-1.5 text-center text-xs font-medium shadow-sm ${order.status === "Preklicano" ? "border-red-600" : order.status === "V obdelavi" ? "border-yellow-200" : order.status === "Zaključeno" ? "border-green-600" : "border-black/25"}`}
      >
        {order.status}
      </p>
      <Link href={`/admin/narocila/${order.id}`}>
        <Pencil className="h-5 stroke-2" />
      </Link>
    </div>
  );
}

export default OrdersPage;
