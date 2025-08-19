"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Button";
import { getOneDiscountByName } from "@/lib/discountActions";
import LinkBtn from "../LinkBtn";

function Discount() {
  const [discount, setDiscount] = useState("");
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  function updateCartTotal() {
    const userCartString = localStorage.getItem("cart");
    if (userCartString) {
      const cart = JSON.parse(userCartString);
      setCart(cart);
    }
  }

  useEffect(function () {
    const discountCode = localStorage.getItem("discount");

    if (discountCode) {
      setDiscount(JSON.parse(discountCode).name);
    }

    updateCartTotal();

    const handleCartTotalUpdate = () => updateCartTotal();

    window.addEventListener("cart-updated", handleCartTotalUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartTotalUpdate);
    };
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
    <div className="relative grid gap-18 md:mx-auto md:w-2/3 md:gap-x-5 lg:w-full lg:grid-cols-[4fr_6fr] lg:gap-y-6 xl:w-5/6">
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
        <div className="absolute top-14 left-0 flex w-full items-center justify-between lg:static lg:order-3">
          <p className="font-semibold">{discount}</p>
          <X
            height={24}
            className="cursor-pointer"
            onClick={handleRemoveDiscount}
          />
        </div>
      )}
      <LinkBtn
        href={
          cart.length > 0 ? "/kosarica/zakljucek-nakupa" : "/spletna-trgovina"
        }
        variant="primary"
        className="flex justify-center"
      >
        {cart.length > 0
          ? "Nadaljuj na blagajno"
          : "Izberi izdelke v spletni trgovini"}
      </LinkBtn>
    </div>
  );
}

export default Discount;
