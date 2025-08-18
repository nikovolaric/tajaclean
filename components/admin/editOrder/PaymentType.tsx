function PaymentType({
  paymentMethod,
  notes,
}: {
  paymentMethod: string;
  notes?: string;
}) {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-x-5">
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
    </div>
  );
}

export default PaymentType;
