import Link from "next/link";

function NewOrderCard({
  order,
}: {
  order: { buyer: { firstName: string; lastName: string }; id: string };
}) {
  return (
    <div className="flex items-end justify-between rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-3">
        <p className="text-primary text-sm font-medium">
          Nepregledano naročilo
        </p>
        <p>
          Oseba{" "}
          <strong>
            {order.buyer.firstName} {order.buyer.lastName}
          </strong>{" "}
          je dodala novo naročilo.
        </p>
      </div>
      <Link
        href={`/admin/narocila/${order.id}`}
        className="text-secondary1 text-sm font-semibold"
      >
        Preglej naročilo
      </Link>
    </div>
  );
}

export default NewOrderCard;
