import LinkBtn from "@/components/LinkBtn";
import { getAllDiscounts, getDiscountIncome } from "@/lib/discountActions";
import { Suspense } from "react";

async function ActiveDiscounts() {
  const data = await getAllDiscounts();

  if (data instanceof Error) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Aktivne kode za popust</p>
      <div className="flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        {data.length === 0 && (
          <p className="font-semibold">Trenutno ni aktivnih kod za popust.</p>
        )}
        {data.length > 0 && (
          <ul className="flex flex-col gap-8">
            {data
              .sort((a, b) => b.used - a.used)
              .slice(0, 3)
              .map((discount: { id: string; name: string; used: number }) => (
                <Suspense key={discount.id} fallback={<p>Loading...</p>}>
                  <ActiveDiscountCard discount={discount} />
                </Suspense>
              ))}
          </ul>
        )}
        <LinkBtn
          variant="primary"
          href="/admin/popusti"
          className="self-center text-center"
        >
          Urejevalnik kod za popust
        </LinkBtn>
      </div>
    </div>
  );
}

async function ActiveDiscountCard({
  discount,
}: {
  discount: { id: string; name: string; used: number };
}) {
  const income = await getDiscountIncome(discount.name);

  return (
    <li className="flex flex-col gap-2">
      <p className="text-sm font-medium">{discount.name}</p>
      <div className="flex items-center justify-between text-sm font-medium">
        <p>
          Skupna prodaja:{" "}
          {new Intl.NumberFormat("sl-SI", {
            style: "currency",
            currency: "EUR",
          }).format(Number(income) ?? 0)}
        </p>
        <p>Št. vnovčitev: {discount.used}</p>
      </div>
    </li>
  );
}

export default ActiveDiscounts;
