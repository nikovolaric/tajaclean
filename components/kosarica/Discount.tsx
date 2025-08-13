"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Button";
import { getOneDiscountByName } from "@/lib/discountActions";

function Discount() {
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");

  useEffect(function () {
    const discountCode = localStorage.getItem("discount");

    if (discountCode) {
      setDiscount(JSON.parse(discountCode).name);
    }
  }, []);

  async function handleAction(formData: FormData) {
    setError("");
    try {
      const discount = formData.get("discount") as string;

      const data = await getOneDiscountByName(discount);

      if (data.message) {
        if (data.details === "The result contains 0 rows") {
          throw new Error("Koda ne obstaja oz. je neveljavna!");
        } else {
          throw data;
        }
      }

      const cartString = localStorage.getItem("cart");

      if (cartString) {
        const cart = JSON.parse(cartString);

        const cartDiscount = cart.map(
          (article: { discountPrice?: number; price: number }) => {
            return {
              ...article,
              discountPrice: parseFloat(
                (article.price * (1 - data.value)).toFixed(2),
              ),
              code: true,
            };
          },
        );

        localStorage.setItem("cart", JSON.stringify(cartDiscount));
        localStorage.setItem(
          "discount",
          JSON.stringify({ name: data.name, _id: data._id, value: data.value }),
        );

        window.dispatchEvent(new Event("cart-updated"));
      }

      setDiscount(data.name);
      setError("");
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
    }
  }

  function handleRemoveDiscount() {
    const cartString = localStorage.getItem("cart");

    if (cartString) {
      const cart = JSON.parse(cartString);

      const updatedCart = cart.map(
        (article: { code?: number; discountPrice?: number; price: number }) => {
          if (article.code) {
            const newArticle = { ...article };
            delete newArticle.code;
            delete newArticle.discountPrice;

            return newArticle;
          }
          if (!article.code) return article;
        },
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.removeItem("discount");

      window.dispatchEvent(new Event("cart-updated"));
    }

    setDiscount("");
  }

  return (
    <>
      <form
        className="flex items-center justify-between gap-5 border border-black/50 bg-white px-4 py-2"
        action={handleAction}
      >
        <input
          placeholder="Vnesite kodo za popust"
          name="discount"
          autoComplete="off"
          className="outline-none"
        />
        <Button variant="secondary" className="font-semibold">
          POTRDI
        </Button>
      </form>
      {error && (
        <p className="text-alert order-3 text-sm font-medium">{error}</p>
      )}
      {discount && (
        <div className="order-3 flex items-center justify-between">
          <p className="font-semibold">{discount}</p>
          <X
            height={24}
            className="cursor-pointer"
            onClick={handleRemoveDiscount}
          />
        </div>
      )}
    </>
  );
}

export default Discount;
