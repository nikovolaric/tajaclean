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
        country: "Slovenija",
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
        <H2>Podatki za dostavo</H2>
        <div className="flex items-center gap-6">
          <div
            className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
            onClick={handleClick}
          >
            <span
              className={`h-2 w-2 rounded-full ${isSame ? "bg-primary" : ""}`}
            />
          </div>
          <label>Podatki za dostavo se ujemajo s podatki za račun.</label>
        </div>
        {!isSame && (
          <form className="grid gap-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-10">
            <div>
              <label>Ime</label>
              <Input
                required
                placeholder="Vnesite svoje ime"
                name="firstName"
                onChange={(e) =>
                  setDelivery({ ...delivery, firstName: e.target.value })
                }
                defaultValue={delivery.firstName}
              />
            </div>
            <div>
              <label>Priimek</label>
              <Input
                required
                placeholder="Vnesite svoj priimek"
                name="lastName"
                onChange={(e) =>
                  setDelivery({ ...delivery, lastName: e.target.value })
                }
                defaultValue={delivery.lastName}
              />
            </div>
            <div>
              <label>Ime podjetja (opcijsko)</label>
              <Input
                placeholder="Vnesite ime podjetja"
                name="company"
                onChange={(e) =>
                  setDelivery({ ...delivery, company: e.target.value })
                }
                defaultValue={delivery.company}
              />
            </div>
            <div>
              <label>ID za DDV (opcijsko)</label>
              <Input
                placeholder="Vnesite ID za DDV"
                name="taxNo"
                onChange={(e) =>
                  setDelivery({ ...delivery, taxNo: e.target.value })
                }
                defaultValue={delivery.taxNo}
              />
            </div>
            <div>
              <label>Ulica in hišna številka</label>
              <Input
                required
                placeholder="Vnesite ulico s hišno številko"
                name="address"
                onChange={(e) =>
                  setDelivery({ ...delivery, address: e.target.value })
                }
                defaultValue={delivery.address}
              />
            </div>
            <div>
              <label>Kraj</label>
              <Input
                required
                placeholder="Vnesite kraj"
                name="city"
                onChange={(e) =>
                  setDelivery({ ...delivery, city: e.target.value })
                }
                defaultValue={delivery.city}
              />
            </div>
            <div>
              <label>Poštna številka</label>
              <Input
                required
                placeholder="Vnesite poštno številko"
                name="postal"
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
                value="Slovenija"
                disabled
              />
            </div>
          </form>
        )}
      </div>
      <div className="hidden xl:order-4 xl:block" />
      <div className="flex flex-col gap-10 xl:order-5 xl:w-3/4">
        <H2>Opombe</H2>
        <Textarea
          placeholder="Vnesite opombe"
          onChange={(e) => setNotes(e.target.value)}
          defaultValue={notes}
        />
      </div>
      <div className="hidden xl:order-6 xl:block" />
      <div className="flex flex-col gap-10 xl:order-7 xl:w-3/4">
        <H2>Način dostave</H2>
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
