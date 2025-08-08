import { createClient } from "@/lib/supabase/server";
import NewOrderCard from "../orders/NewOrderCard";

async function NewOrders() {
  const supabase = await createClient();

  const { error, data } = await supabase
    .from("orders")
    .select()
    .eq("status", "Nepregledano");

  if (error || data.length === 0) return <></>;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Nova naročila</p>
      <div className="flex flex-col gap-4">
        {data.map(
          (order: {
            buyer: { firstName: string; lastName: string };
            id: string;
          }) => (
            <NewOrderCard key={order.id} order={order} />
          ),
        )}
      </div>
    </div>
  );
}

export default NewOrders;
