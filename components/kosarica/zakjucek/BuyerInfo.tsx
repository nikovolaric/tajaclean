"use client";

import { useCartContext } from "@/components/ContextProvider";
import { Input } from "@/components/Input";
import { H2 } from "@/components/Text";

function BuyerInfo() {
  const { buyer, setBuyer } = useCartContext();

  return (
    <div className="flex flex-col gap-10 xl:w-3/4">
      <H2>Podatki za račun</H2>
      <form className="grid gap-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-10">
        <div>
          <label>Ime</label>
          <Input
            required
            placeholder="Vnesite svoje ime"
            name="firstName"
            onChange={(e) => setBuyer({ ...buyer, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Priimek</label>
          <Input
            required
            placeholder="Vnesite svoj priimek"
            name="lastName"
            onChange={(e) => setBuyer({ ...buyer, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Elektronski naslov</label>
          <Input
            required
            placeholder="Vnesite elektronski naslov"
            name="email"
            onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
          />
        </div>
        <div>
          <label>Telefonska številka</label>
          <Input
            required
            placeholder="Vnesite telefonsko številko"
            name="phone"
            onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Ime podjetja (opcijsko)</label>
          <Input
            placeholder="Vnesite ime podjetja"
            name="company"
            onChange={(e) => setBuyer({ ...buyer, company: e.target.value })}
          />
        </div>
        <div>
          <label>ID za DDV (opcijsko)</label>
          <Input
            placeholder="Vnesite ID za DDV"
            name="taxNo"
            onChange={(e) => setBuyer({ ...buyer, taxNo: e.target.value })}
          />
        </div>
        <div>
          <label>Ulica in hišna številka</label>
          <Input
            required
            placeholder="Vnesite ulico s hišno številko"
            name="address"
            onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
          />
        </div>
        <div>
          <label>Kraj</label>
          <Input
            required
            placeholder="Vnesite kraj"
            name="city"
            onChange={(e) => setBuyer({ ...buyer, city: e.target.value })}
          />
        </div>
        <div>
          <label>Poštna številka</label>
          <Input
            required
            placeholder="Vnesite ulico s hišno številko"
            name="postal"
            onChange={(e) => setBuyer({ ...buyer, postal: e.target.value })}
          />
        </div>
        <div>
          <label>Država</label>
          <Input
            required
            placeholder="Slovenija"
            name="country"
            onChange={(e) => setBuyer({ ...buyer, country: e.target.value })}
          />
        </div>
      </form>
    </div>
  );
}

export default BuyerInfo;
