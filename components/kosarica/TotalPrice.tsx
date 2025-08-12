"use client";

import { useEffect, useState } from "react";

function TotalPrice() {
  const [total, setTotal] = useState(0);
  const [noDiscount, setNoDiscount] = useState(0);

  function updateCartTotal() {
    const userCartString = localStorage.getItem("cart");
    if (userCartString) {
      const cart = JSON.parse(userCartString);

      const cartTotal = cart.reduce(
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

      const cartNoDiscount = cart.reduce(
        (a: number, c: { price: number; quantity: number }) => {
          return a + c.price * c.quantity;
        },
        0,
      );

      setNoDiscount(cartNoDiscount);
      setTotal(cartTotal);
    } else {
      setTotal(0);
    }
  }

  useEffect(function () {
    updateCartTotal();

    const handleCartTotalUpdate = () => updateCartTotal();

    window.addEventListener("cart-updated", handleCartTotalUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartTotalUpdate);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-between gap-14 border-y px-4 py-10 md:mx-auto md:w-2/3 lg:w-full lg:px-8 xl:w-5/6">
      <p>Skupaj za plačilo (z vključenim DDV):</p>
      <div className="flex items-center gap-4">
        {noDiscount !== total && (
          <p className="self-start font-bold text-black/50 line-through decoration-2">
            {new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
            }).format(noDiscount > 3.2 ? noDiscount : 0)}
          </p>
        )}
        <p className="font-semibold lg:text-lg">
          {new Intl.NumberFormat("sl-SI", {
            style: "currency",
            currency: "EUR",
          }).format(total > 3.2 ? (total < 40 ? total + 3.2 : total) : 0)}
        </p>
      </div>
    </div>
  );
}

export default TotalPrice;
