"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function ArticlesCard({
  article,
  img,
}: {
  article: {
    name: string;
    name_hr: string;
    price: number;
    favourite: boolean;
    id: string;
    packQ: number;
  };
  img: string;
}) {
  const { name, name_hr, price, favourite, id, packQ } = article;

  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  function handleClick() {
    if (quantity === 0) return;

    const curCart = localStorage.getItem("cart");
    const curDiscount = localStorage.getItem("discount");

    const cartData: {
      name: string;
      name_hr: string;
      price: number;
      id: string;
      quantity: number;
      packQ: number;
      img: string;
      discountPrice?: number;
      code?: boolean;
    } = {
      name,
      name_hr,
      price,
      id,
      quantity,
      packQ,
      img,
    };

    if (curDiscount) {
      const discount = JSON.parse(curDiscount);

      cartData.discountPrice = price * (1 - discount.value);
      cartData.code = true;
    }

    if (curCart) {
      const cart = JSON.parse(curCart);

      const existing = cart.find((el: { id: string }) => el.id === id);

      if (!existing) {
        localStorage.setItem("cart", JSON.stringify([...cart, cartData]));
      } else {
        const updatedCart = cart
          .map((el: { id: string }) => {
            if (el.id === id) {
              return { ...el, quantity };
            } else {
              return el;
            }
          })
          .filter((el: { quantity: number }) => el.quantity > 0);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([cartData]));
    }

    window.dispatchEvent(new Event("cart-updated"));

    router.push("/hr/kosarica");
  }

  return (
    <div
      className={`grid gap-8 p-4 select-none ${favourite ? "bg-secondary1/25 shadow-[2px_2px_4px_rgba(0,0,0,0.25)]" : "bg-secondary1/10"}`}
    >
      <Image
        src={img}
        alt={name}
        height={500}
        width={400}
        className="h-auto max-h-60 w-full object-cover lg:max-h-74"
      />
      <p className="text-primary text-lg font-semibold md:text-center">
        {name_hr}
      </p>
      <p className="md:text-center">
        Paket sadrži{" "}
        <span className="font-semibold">
          {packQ} {packQ === 3 ? "čudotvorne krpice" : "čudotvornih krpica"}
        </span>{" "}
        veličine 40 x 40 cm.
      </p>
      <div className="flex items-center justify-between md:mx-auto md:w-3/4">
        <p className="text-xl font-semibold">
          {new Intl.NumberFormat("sl-SI", {
            style: "currency",
            currency: "EUR",
          }).format(price)}
        </p>
        <div className="flex items-center gap-2">
          <MinusIcon
            width={20}
            className="cursor-pointer"
            onClick={() => {
              if (quantity > 0) return setQuantity((q) => q - 1);
            }}
          />
          <span className="font-medium">{quantity}</span>
          <PlusIcon
            width={20}
            className="cursor-pointer"
            onClick={() => setQuantity((q) => q + 1)}
          />
        </div>
      </div>
      <Button
        className="flex w-full justify-center justify-self-center"
        variant="primary"
        onClick={handleClick}
      >
        Dodaj u košaricu
      </Button>
    </div>
  );
}

export default ArticlesCard;
