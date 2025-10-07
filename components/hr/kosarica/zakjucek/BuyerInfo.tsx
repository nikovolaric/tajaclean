"use client";

import { useCartContext } from "@/components/kosarica/CartContextProvider";
import { Input } from "@/components/Input";
import { H2 } from "@/components/Text";

function BuyerInfo() {
  const { buyer, setBuyer } = useCartContext();

  return (
    <div className="flex flex-col gap-10 xl:w-3/4">
      <H2>Podaci o računu</H2>
      <form className="grid gap-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-10">
        <div>
          <label>
            Ime<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Unesite svoje ime"
            name="firstName"
            onChange={(e) => setBuyer({ ...buyer, firstName: e.target.value })}
            defaultValue={buyer.firstName}
          />
        </div>
        <div>
          <label>
            Prezime<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Unesite svoje prezime"
            name="lastName"
            onChange={(e) => setBuyer({ ...buyer, lastName: e.target.value })}
            defaultValue={buyer.lastName}
          />
        </div>
        <div>
          <label>
            E-mail adresa
            <span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Unesite adresu e-pošte"
            name="email"
            onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
            defaultValue={buyer.email}
          />
        </div>
        <div>
          <label>
            Broj telefona
            <span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Unesite broj telefona"
            name="phone"
            onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
            defaultValue={buyer.phone}
          />
        </div>
        <div>
          <label>Naziv tvrtke (nije obavezno)</label>
          <Input
            placeholder="Unesite naziv tvrtke"
            name="company"
            onChange={(e) => setBuyer({ ...buyer, company: e.target.value })}
            defaultValue={buyer.company}
          />
        </div>
        <div>
          <label>PDV ID broj (nije obavezno)</label>
          <Input
            placeholder="Unesite PDV identifikacijski broj"
            name="taxNo"
            onChange={(e) => setBuyer({ ...buyer, taxNo: e.target.value })}
            defaultValue={buyer.taxNo}
          />
        </div>
        <div>
          <label>
            Ulica i kućni broj
            <span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Unesite ulicu s kućnim brojem"
            name="address"
            onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
            defaultValue={buyer.address}
          />
        </div>
        <div>
          <label>
            Grad<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Unesite grad"
            name="city"
            onChange={(e) => setBuyer({ ...buyer, city: e.target.value })}
            defaultValue={buyer.city}
          />
        </div>
        <div>
          <label>
            Poštanski broj<span className="text-alert font-medium">*</span>
          </label>
          <Input
            required
            placeholder="Unesite poštanski broj"
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
            onChange={(e) => setBuyer({ ...buyer, country: e.target.value })}
            defaultValue={buyer.country}
          />
        </div>
      </form>
    </div>
  );
}

export default BuyerInfo;
