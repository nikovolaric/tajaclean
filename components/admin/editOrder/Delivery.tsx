function Delivery({ deliveryPrice }: { deliveryPrice: number }) {
  return (
    <div className="grid grid-cols-[7fr_3fr_3fr_3fr_3fr] rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
      <p className="col-span-4 text-sm font-medium">Pošta Slovenije</p>
      <p className="text-center text-sm font-semibold">
        {new Intl.NumberFormat("sl-SI", {
          style: "currency",
          currency: "EUR",
        }).format(deliveryPrice)}
      </p>
    </div>
  );
}

export default Delivery;
