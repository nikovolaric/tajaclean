"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import Button from "../Button";

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
    try {
      const discount = formData.get("discount") as string;

      const res = await fetch(
        `/api/discounts/getCode?name=${discount.toUpperCase()}`,
      );

      const data = await res.json();

      if (!res.ok) {
        throw Error(data.message);
      }

      const articlesString = localStorage.getItem("articles");

      if (articlesString) {
        const articles = JSON.parse(articlesString);

        const articlesDiscount = articles.map(
          (article: { discountPrice?: number; price: number }) => {
            if (article.discountPrice) return article;
            if (!article.discountPrice)
              return {
                ...article,
                discountPrice: parseFloat(
                  (article.price * (1 - data.discount.value)).toFixed(2),
                ),
                code: true,
              };
          },
        );

        localStorage.setItem("articles", JSON.stringify(articlesDiscount));
        localStorage.setItem(
          "discount",
          JSON.stringify({ name: data.discount.name, _id: data.discount._id }),
        );

        window.dispatchEvent(new Event("cart-updated"));
      }

      setDiscount(data.discount.name);
      setError("");
    } catch (err) {
      console.log(err);
      setError((err as Error).message);
    }
  }

  function handleRemoveDiscount() {
    const articlesString = localStorage.getItem("articles");

    if (articlesString) {
      const articles = JSON.parse(articlesString);

      const updatedArticles = articles.map(
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

      localStorage.setItem("articles", JSON.stringify(updatedArticles));
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
      {error && <p className="text-alert text-sm font-medium">{error}</p>}
      {discount && (
        <div className="flex items-center justify-between">
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
