function BasicInfo({
  order,
}: {
  order: {
    buyer: { firstName: string; lastName: string };
    total_price: number;
    created_at: string;
  };
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Osnovne informacije</p>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">Kupec:</p>
          <p className="text-sm font-semibold">
            {order.buyer.firstName} {order.buyer.lastName}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">
            Skupni znesek za plačilo:
          </p>

          <p className="text-sm font-semibold">
            {new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
            }).format(order.total_price)}
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">Datum in ura</p>

          <p className="text-sm font-semibold">
            {new Date(order.created_at).toLocaleDateString("sl-SI", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
