"use client";

import { MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

function CartCard({
  item,
}: {
  item: {
    name: string;
    packQ: number;
    quantity: number;
    price: number;
    img: string;
    id: string;
  };
}) {
  const { name, packQ, quantity: curQuantity, price, img, id } = item;

  const [quantity, setQuantity] = useState(curQuantity);

  function handlePlus() {
    setQuantity((q) => q + 1);

    const curCart = localStorage.getItem("cart");

    if (curCart) {
      const cart = JSON.parse(curCart);

      const existing = cart.find((el: { id: string }) => el.id === id);

      if (existing) {
        const updatedCart = cart
          .map((el: { id: string }) => {
            if (el.id === id) {
              return { ...el, quantity: quantity + 1 };
            } else {
              return el;
            }
          })
          .filter((el: { quantity: number }) => el.quantity > 0);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }

    window.dispatchEvent(new Event("cart-updated"));
  }

  function handleMinus() {
    if (quantity > 0) {
      setQuantity((q) => q - 1);

      const curCart = localStorage.getItem("cart");

      if (curCart) {
        const cart = JSON.parse(curCart);

        const existing = cart.find((el: { id: string }) => el.id === id);

        if (existing) {
          const updatedCart = cart
            .map((el: { id: string }) => {
              if (el.id === id) {
                return { ...el, quantity: quantity - 1 };
              } else {
                return el;
              }
            })
            .filter((el: { quantity: number }) => el.quantity > 0);

          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      }
    }

    window.dispatchEvent(new Event("cart-updated"));
  }

  function handleDelete() {
    const curCart = localStorage.getItem("cart");

    if (curCart) {
      const cart = JSON.parse(curCart);

      const updatedCart = cart.filter((el: { id: string }) => el.id !== id);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    window.dispatchEvent(new Event("cart-updated"));
  }

  return (
    <div className="bg-secondary1/15 relative flex flex-col gap-8 px-4 py-6 md:mx-auto md:w-2/3 lg:grid lg:w-full lg:grid-cols-[1fr_2fr_1fr_2fr_1fr] lg:items-center xl:w-5/6">
      <Image
        src={img}
        alt="Slika paketa"
        width={132}
        height={100}
        className="hidden max-h-25 max-w-34 object-cover lg:block"
      />
      <div className="flex flex-col gap-2 lg:gap-4">
        <p className="font-semibold">{name}</p>
        <p className="text-sm lg:text-base">
          {packQ} {packQ === 3 ? "čudotvorne krpice" : "čudotvornih krpica"}
        </p>
      </div>
      <div className="hidden justify-self-center lg:block">
        <p className="mb-2 text-center text-sm font-light">Cijena</p>
        <p className="font-semibold">
          {new Intl.NumberFormat("sl-SI", {
            style: "currency",
            currency: "EUR",
          }).format(price)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-2 text-center text-sm font-light">Količina</p>
          <div className="flex items-center gap-4">
            <MinusIcon
              width={20}
              className="cursor-pointer"
              onClick={handleMinus}
            />
            <span className="font-medium">{quantity}</span>
            <PlusIcon
              width={20}
              className="cursor-pointer"
              onClick={handlePlus}
            />
          </div>
        </div>
        <div>
          <p className="mb-2 text-center text-sm font-light">Ukupno</p>
          <p className="font-semibold">
            {new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
            }).format(price * quantity)}
          </p>
        </div>
      </div>
      <Trash2
        height={24}
        className="absolute top-4 right-4 cursor-pointer lg:static lg:justify-self-center"
        onClick={handleDelete}
      />
    </div>
  );
}

export default CartCard;
