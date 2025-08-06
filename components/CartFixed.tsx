"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Bag from "./icons/Bag";

function CartFixed() {
  const pathname = usePathname();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

  if (pathname.includes("/kosarica") || pathname.includes("/admin")) {
    return <></>;
  }

  if (cart.length > 0)
    return (
      <div
        className="bg-primary fixed right-4 bottom-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full shadow-[1px_1px_4px_rgba(0,0,0,0.25)] lg:right-8 lg:bottom-8 lg:h-16 lg:w-16"
        onClick={() => router.push("/kosarica")}
      >
        <Bag className={`relative h-5 w-auto lg:h-7`} stroke="#EDEAE5" />
        <p className="text-alert bg-neutral3 absolute top-1.5 right-2 flex h-4 w-4 items-center justify-center rounded-full text-xs font-medium lg:top-4 lg:right-3">
          {cart.length}
        </p>
      </div>
    );
}

export default CartFixed;
