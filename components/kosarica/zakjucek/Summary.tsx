"use client";

import { useCartContext } from "@/components/kosarica/CartContextProvider";
import { H2 } from "@/components/Text";
import { useState, useEffect } from "react";

function Summary() {
  const { paymentMethod } = useCartContext();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);

  function updateCart() {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      setCart(JSON.parse(cartString));

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

      const discountTotal = JSON.parse(cartString).reduce(
        (
          a: number,
          c: { discountPrice?: number; price: number; quantity: number },
        ) => {
          if (c.discountPrice) {
            return a + (c.price * c.quantity - c.discountPrice * c.quantity);
          } else {
            return 0;
          }
        },
        0,
      );

      setDiscountTotal(discountTotal);
      setTotal(cartTotal);
    } else {
      setCart([]);
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

  function generateTotalDelivery() {
    if (paymentMethod === "povzetje" && total < 40) {
      return 5.5;
    }
    if (paymentMethod !== "povzetje" && total < 40) {
      return 3.2;
    }

    return 0;
  }

  function generateTotal() {
    if (paymentMethod === "povzetje" && total < 40) {
      return total + 5.5;
    }
    if (paymentMethod !== "povzetje" && total < 40) {
      return total + 3.2;
    }

    return total;
  }

  return (
    <div className="flex flex-col gap-10 xl:order-2">
      <H2>Povzetek naročila</H2>
      <div className="bg-primary/5 flex flex-col gap-6 px-4 py-6 lg:px-6 lg:py-10">
        {cart.map(
          (item: {
            id: string;
            name: string;
            packQ: number;
            quantity: number;
            price: number;
            discountPrice?: number;
          }) => (
            <div key={item.id} className="flex items-center justify-between">
              <p className="flex flex-col gap-2 font-semibold">
                {item.name}
                <span className="font-normal">
                  {item.packQ}{" "}
                  {item.packQ === 3 ? "čudežne krpice" : "čudežnih krpic"}
                </span>
              </p>
              <p className="flex flex-col gap-2 text-sm font-light">
                Količina
                <span className="text-center text-base font-semibold">
                  {item.quantity}
                </span>
              </p>
              <p className="flex flex-col gap-2 text-sm font-light">
                Skupaj
                <span className="text-base font-semibold">
                  {new Intl.NumberFormat("sl-SI", {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.price * item.quantity)}
                </span>
              </p>
            </div>
          ),
        )}
        <div className="border-neutral1 border-y py-6">
          {/* <div className="flex items-center justify-between">
            <p>Izdelki</p>
            <p className="font-semibold">
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(total)}
            </p>
          </div> */}
          <div className="flex items-center justify-between">
            <p>Dostava</p>
            <p className="font-semibold">
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(generateTotalDelivery())}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>DDV</p>
            <p className="font-semibold">
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(0)}
            </p>
          </div>
          {discountTotal !== 0 && (
            <div className="flex items-center justify-between">
              <p>Popust</p>
              <p className="font-semibold">
                -
                {new Intl.NumberFormat("sl-SI", {
                  style: "currency",
                  currency: "EUR",
                }).format(discountTotal)}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p>Skupaj za plačilo</p>
          <p className="font-semibold">
            {new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
            }).format(generateTotal())}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Summary;
