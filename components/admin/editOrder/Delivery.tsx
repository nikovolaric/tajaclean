function Delivery() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Način dostave</p>
      <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        <p className="text-sm font-medium">Pošta Slovenije</p>
        <p className="text-sm font-semibold">
          {new Intl.NumberFormat("sl-SI", {
            style: "currency",
            currency: "EUR",
          }).format(3.2)}
        </p>
      </div>
    </div>
  );
}

export default Delivery;
