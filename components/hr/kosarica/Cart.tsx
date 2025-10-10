"use client";

import { useEffect, useState } from "react";
import CartCard from "./CartCard";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [noCodeTotal, setNoCodeTotal] = useState(0);
  const [code, setCode] = useState("");

  function updateCart() {
    const cartString = localStorage.getItem("cart");
    const discountString = localStorage.getItem("discount");
    if (cartString) {
      setCart(JSON.parse(cartString));

      if (discountString) {
        setCode(JSON.parse(discountString).name);
      } else {
        setCode("");
      }

      if (JSON.parse(cartString).length === 0) {
        localStorage.removeItem("discount");
      }

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

      const noCodeTotal = JSON.parse(cartString).reduce(
        (a: number, c: { price: number; quantity: number }) => {
          return a + c.price * c.quantity;
        },
        0,
      );

      setTotal(cartTotal);
      setNoCodeTotal(noCodeTotal);
    } else {
      setCart([]);
      localStorage.removeItem("discount");
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

  return (
    <div className="grid gap-12 lg:gap-18">
      <h4 className="font-lora text-primary text-2xl font-medium lg:text-[28px]">
        Vaša košarica
      </h4>
      <div className="flex flex-col gap-4 lg:gap-6">
        {cart.map(
          (item: {
            id: string;
            name: string;
            packQ: number;
            quantity: number;
            price: number;
            img: string;
          }) => (
            <CartCard item={item} key={item.id} />
          ),
        )}
        {code && cart.length > 0 && (
          <div className="bg-secondary1/15 flex items-center justify-between gap-8 px-4 py-6 md:mx-auto md:w-2/3 lg:w-full lg:px-8 xl:w-5/6">
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-22">
              <p className="font-semibold">KÔD ZA POPUST</p>
              <p className="text-sm">{code}</p>
            </div>
            <p className="font-semibold">
              -
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(noCodeTotal - total)}
            </p>
          </div>
        )}
        {cart.length > 0 && (
          <div className="bg-secondary1/15 flex items-center justify-between gap-8 px-4 py-6 md:mx-auto md:w-2/3 lg:w-full lg:px-8 xl:w-5/6">
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-22">
              <p className="font-semibold">ISPORUKA</p>
              <p className="text-sm">Hrvatska Pošta</p>
            </div>
            <p className="font-semibold">
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(total < 40 ? 3.2 : 0)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
