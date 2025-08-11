"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import NewOrderCard from "./NewOrderCard";
import Link from "next/link";
import { Pencil, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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

        try {
          setIsLoading(true);

          let query = supabase
            .from("orders")
            .select()
            .order("created_at", { ascending: false });

          if (name) {
            query = query.or(
              `buyer->>lastName.ilike.%${name}%,buyer->>firstName.ilike.%${name}%`,
            );
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
    [name],
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
          <NameBar />
          {isLoading ? (
            // <Spinner />
            <p>...</p>
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
                  <OrderCard key={`${order.id}${i}`} order={order} />
                ),
              )}
            </>
          )}
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

function NameBar() {
  return (
    <>
      <p className="text-xl font-semibold">Vsa naročila</p>
      <div className="grid grid-cols-[3fr_3fr_4fr_3fr_4fr_2fr] text-sm">
        <p className="w-full rounded-s-lg border border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
          ID naročila
        </p>
        <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
          Datum in ura
        </p>
        <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
          Kupec
        </p>
        <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
          Znesek
        </p>
        <p className="w-full border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
          Status
        </p>
        <p className="w-full rounded-e-lg border-y border-e border-[rgba(0,0,0,0.25)] bg-white py-2 text-center font-semibold shadow-sm">
          Uredi
        </p>
      </div>
    </>
  );
}

function OrderCard({
  order,
}: {
  order: {
    id: string;
    created_at: string;
    buyer: { firstName: string; lastName: string };
    total_price: number;
    status: string;
  };
}) {
  return (
    <div className="grid grid-cols-[3fr_3fr_4fr_3fr_4fr_2fr] items-center justify-items-center rounded-xl bg-white py-4 text-sm shadow-sm">
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
      <p className="rounded-md border border-[rgba(0,0,0,0.25)] px-1.5 text-center text-xs font-medium shadow-sm">
        {order.status}
      </p>
      <Link href={`/admin/narocila/${order.id}`}>
        <Pencil className="h-5 stroke-2" />
      </Link>
    </div>
  );
}

export default OrdersPage;
