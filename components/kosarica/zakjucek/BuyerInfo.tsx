"use client";

import { useCartContext } from "@/components/kosarica/CartContextProvider";
import { Input } from "@/components/Input";
import { H2 } from "@/components/Text";
import { useEffect } from "react";

function BuyerInfo() {
  const { buyer, setBuyer } = useCartContext();

  useEffect(function () {
    setBuyer({ ...buyer, country: "Slovenija" });
  }, []);

  return (
    <div className="flex flex-col gap-10 xl:w-3/4">
      <H2>Podatki za račun</H2>
      <form className="grid gap-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-10">
        <div>
          <label>
            Ime<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Vnesite svoje ime"
            name="firstName"
            onChange={(e) => setBuyer({ ...buyer, firstName: e.target.value })}
            defaultValue={buyer.firstName}
          />
        </div>
        <div>
          <label>
            Priimek<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Vnesite svoj priimek"
            name="lastName"
            onChange={(e) => setBuyer({ ...buyer, lastName: e.target.value })}
            defaultValue={buyer.lastName}
          />
        </div>
        <div>
          <label>
            Elektronski naslov
            <span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Vnesite elektronski naslov"
            name="email"
            onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
            defaultValue={buyer.email}
          />
        </div>
        <div>
          <label>
            Telefonska številka
            <span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Vnesite telefonsko številko"
            name="phone"
            onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
            defaultValue={buyer.phone}
          />
        </div>
        <div>
          <label>Ime podjetja (opcijsko)</label>
          <Input
            placeholder="Vnesite ime podjetja"
            name="company"
            onChange={(e) => setBuyer({ ...buyer, company: e.target.value })}
            defaultValue={buyer.company}
          />
        </div>
        <div>
          <label>ID za DDV (opcijsko)</label>
          <Input
            placeholder="Vnesite ID za DDV"
            name="taxNo"
            onChange={(e) => setBuyer({ ...buyer, taxNo: e.target.value })}
            defaultValue={buyer.taxNo}
          />
        </div>
        <div>
          <label>
            Ulica in hišna številka
            <span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Vnesite ulico s hišno številko"
            name="address"
            onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
            defaultValue={buyer.address}
          />
        </div>
        <div>
          <label>
            Kraj<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Vnesite kraj"
            name="city"
            onChange={(e) => setBuyer({ ...buyer, city: e.target.value })}
            defaultValue={buyer.city}
          />
        </div>
        <div>
          <label>
            Poštna številka<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Vnesite poštno številko"
            name="postal"
            onChange={(e) => setBuyer({ ...buyer, postal: e.target.value })}
            defaultValue={buyer.postal}
          />
        </div>
        <div>
          <label>
            Država<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Slovenija"
            name="country"
            value="Slovenija"
            disabled
          />
        </div>
      </form>
    </div>
  );
}

export default BuyerInfo;
