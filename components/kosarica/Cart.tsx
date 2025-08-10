"use client";

import { useEffect, useState } from "react";
import CartCard from "./CartCard";

function Cart() {
  const [cart, setCart] = useState([]);

  function updateCart() {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      setCart(JSON.parse(cartString));
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

  return (
    <div className="grid gap-12 lg:gap-18">
      <h4 className="font-lora text-primary text-2xl font-semibold lg:text-[28px]">
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
        {cart.length > 0 && (
          <div className="bg-secondary1/15 flex items-center justify-between gap-8 px-4 py-6 md:mx-auto md:w-2/3 lg:w-full lg:px-8 xl:w-5/6">
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-22">
              <p className="font-semibold">DOSTAVA</p>
              <p className="text-sm">Pošta Slovenije</p>
            </div>
            <p className="font-semibold">
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(3.2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
