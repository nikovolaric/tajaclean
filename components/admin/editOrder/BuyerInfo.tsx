function BuyerInfo({
  buyer,
}: {
  buyer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal: string;
    taxNo?: string;
    company?: string;
  };
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Podatki o kupcu</p>
      <div className="grid grid-cols-3 gap-x-5 gap-y-2">
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">Ime in priimek:</p>
          <p className="text-sm font-semibold">
            {buyer.firstName} {buyer.lastName}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">
            Elektronski naslov:
          </p>
          <p className="text-sm font-semibold">{buyer.email}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">
            Telefonska številka:
          </p>
          <p className="text-sm font-semibold">{buyer.phone}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">Naslov kupca:</p>
          <p className="text-sm font-semibold">{buyer.address}</p>
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-secondary text-sm font-medium">
            Pošta in poštna številka:
          </p>
          <p className="text-sm font-semibold">
            {buyer.postal} {buyer.city}
          </p>
        </div>
        {buyer.company && (
          <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
            <p className="text-secondary text-sm font-medium">Podjetje:</p>
            <p className="text-sm font-semibold">{buyer.company}</p>
          </div>
        )}
        {buyer.taxNo && (
          <div className="flex flex-col gap-2 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
            <p className="text-secondary text-sm font-medium">ID za DDV:</p>
            <p className="text-sm font-semibold">{buyer.taxNo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyerInfo;
