"use client";

import { useCartContext } from "@/components/kosarica/CartContextProvider";
import { Input, Textarea } from "@/components/Input";
import { H2 } from "@/components/Text";
import { useEffect, useState } from "react";

function DeliveryInfo() {
  const [isSame, setIsSame] = useState(true);
  const { buyer, delivery, setDelivery, setNotes, notes } = useCartContext();
  const [total, setTotal] = useState(0);

  function updateCart() {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      const cartTotal = JSON.parse(cartString).reduce(
        (
          a: number,
          c: { discountPrice?: number; price: number; quantity: number },
        ) => {
          if (c.discountPrice) {
            return a + c.discountPrice * c.quantity;
          } else {
            return a + c.price * c.quantity;
          }
        },
        0,
      );

      setTotal(cartTotal);
    } else {
      setTotal(0);
    }
  }

  useEffect(function () {
    updateCart();

    const handleCartUpdate = () => updateCart();

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  useEffect(
    function () {
      const {
        firstName,
        lastName,
        company,
        taxNo,
        address,
        city,
        postal,
        country,
      } = buyer;

      setDelivery({
        firstName,
        lastName,
        company,
        taxNo,
        address,
        city,
        postal,
        country,
      });
    },
    [buyer],
  );

  function handleClick() {
    if (isSame) {
      setIsSame(false);
      setDelivery({
        firstName: "",
        lastName: "",
        company: "",
        taxNo: "",
        address: "",
        city: "",
        postal: "",
        country: "",
      });
    } else {
      setIsSame(true);
      const {
        firstName,
        lastName,
        company,
        taxNo,
        address,
        city,
        postal,
        country,
      } = buyer;

      setDelivery({
        firstName,
        lastName,
        company,
        taxNo,
        address,
        city,
        postal,
        country,
      });
    }
  }

  return (
    <>
      <div className="flex flex-col gap-10 xl:order-3 xl:w-3/4">
        <H2>Podaci za dostavu</H2>
        <div className="flex items-center gap-6">
          <div
            className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
            onClick={handleClick}
          >
            <span
              className={`h-2 w-2 rounded-full ${isSame ? "bg-primary" : ""}`}
            />
          </div>
          <label>Podaci za dostavu podudaraju se s podacima na računu.</label>
        </div>
        {!isSame && (
          <form className="grid gap-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-10">
            <div>
              <label>Ime</label>
              <Input
                required
                placeholder="Unesite svoje ime"
                name="firstName"
                onChange={(e) =>
                  setDelivery({ ...delivery, firstName: e.target.value })
                }
                defaultValue={delivery.firstName}
              />
            </div>
            <div>
              <label>Prezime</label>
              <Input
                required
                placeholder="Unesite svoje prezime"
                name="lastName"
                onChange={(e) =>
                  setDelivery({ ...delivery, lastName: e.target.value })
                }
                defaultValue={delivery.lastName}
              />
            </div>
            <div>
              <label>Naziv tvrtke (nije obavezno)</label>
              <Input
                placeholder="Unesite naziv tvrtke"
                name="company"
                onChange={(e) =>
                  setDelivery({ ...delivery, company: e.target.value })
                }
                defaultValue={delivery.company}
              />
            </div>
            <div>
              <label>PDV ID broj (nije obavezno)</label>
              <Input
                placeholder="Unesite PDV identifikacijski broj"
                name="taxNo"
                onChange={(e) =>
                  setDelivery({ ...delivery, taxNo: e.target.value })
                }
                defaultValue={delivery.taxNo}
              />
            </div>
            <div>
              <label>Ulica i kućni broj</label>
              <Input
                required
                placeholder="Unesite ulicu s kućnim brojem"
                name="address"
                onChange={(e) =>
                  setDelivery({ ...delivery, address: e.target.value })
                }
                defaultValue={delivery.address}
              />
            </div>
            <div>
              <label>Grad</label>
              <Input
                required
                placeholder="Unesite grad"
                name="city"
                onChange={(e) =>
                  setDelivery({ ...delivery, city: e.target.value })
                }
                defaultValue={delivery.city}
              />
            </div>
            <div>
              <label>Poštanski broj</label>
              <Input
                required
                placeholder="Unesite poštanski broj"
                onChange={(e) =>
                  setDelivery({ ...delivery, postal: e.target.value })
                }
                defaultValue={delivery.postal}
              />
            </div>
            <div>
              <label>Država</label>
              <Input
                required
                placeholder="Slovenija"
                name="country"
                onChange={(e) =>
                  setDelivery({ ...delivery, country: e.target.value })
                }
                defaultValue={delivery.country}
              />
            </div>
          </form>
        )}
      </div>
      <div className="hidden xl:order-4 xl:block" />
      <div className="flex flex-col gap-10 xl:order-5 xl:w-3/4">
        <H2>Napomene</H2>
        <Textarea
          placeholder="Unesite napomene"
          onChange={(e) => setNotes(e.target.value)}
          defaultValue={notes}
        />
      </div>
      <div className="hidden xl:order-6 xl:block" />
      <div className="flex flex-col gap-10 xl:order-7 xl:w-3/4">
        <H2>Način isporuke</H2>
        <div className="bg-primary/5 flex items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <div className="border-primary flex h-3.5 w-3.5 cursor-not-allowed items-center justify-center rounded-full border bg-white select-none">
              <span className={`bg-primary h-2 w-2 rounded-full`} />
            </div>
            <label>Pošta Slovenije.</label>
          </div>
          <p className="font-semibold">
            {new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
            }).format(total < 50 ? 3.2 : 0)}
          </p>
        </div>
      </div>
      <div className="hidden xl:order-8 xl:block" />
    </>
  );
}

export default DeliveryInfo;
