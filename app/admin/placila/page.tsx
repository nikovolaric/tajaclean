import PaymentCard from "@/components/admin/placila/PaymentCard";
import { getAllPayments } from "@/lib/paymentActions";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Plačila",
};

async function Page() {
  const data = await getAllPayments();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Neuspešna plačila</p>
      <div className="flex flex-col gap-6">
        <NameBar />
        {!data || data.length === 0 ? (
          <p className="text-xl font-semibold">Ni novih neuspešnih plačil.</p>
        ) : (
          data.map((payment, i) => (
            <PaymentCard key={payment.id} payment={payment} i={i} />
          ))
        )}
      </div>
    </div>
  );
}

function NameBar() {
  return (
    <>
      <div className="grid grid-cols-[3fr_3fr_2fr_3fr_1fr] text-sm select-none">
        <p className="w-full rounded-s-lg border border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Datum in ura
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Kupec
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Znesek
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Sumup ID
        </p>
        <p className="w-full rounded-e-lg border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Izbriši
        </p>
      </div>
    </>
  );
}

export default Page;
