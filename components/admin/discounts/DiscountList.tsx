import { createClient } from "@supabase/supabase-js";
import DiscountCard from "./DiscountCard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

async function DiscountList() {
  const { error, data } = await supabase.from("discounts").select();

  return (
    <div className="flex flex-col gap-4">
      <NameBar />
      {error || data?.length === 0 ? (
        <p className="font-medium">Trenutno ni aktivnih kod za popust</p>
      ) : (
        data.map(
          (discount: {
            person_name: string;
            name: string;
            used: string;
            valid_until: string;
            id: string;
          }) => <DiscountCard key={discount.id} discount={discount} />,
        )
      )}
    </div>
  );
}

function NameBar() {
  return (
    <>
      <p className="text-lg font-semibold">Aktivne kode za popust</p>
      <div className="grid grid-cols-[4fr_4fr_3fr_3fr_2fr] text-sm">
        <p className="w-full rounded-s-lg border border-black/25 bg-white px-6 py-2 font-semibold shadow-sm">
          Nosilec kode
        </p>{" "}
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Naziv kode
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Velja do
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Število vnovčitev
        </p>
        <p className="w-full rounded-e-lg border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Uredi
        </p>
      </div>
    </>
  );
}

export default DiscountList;
