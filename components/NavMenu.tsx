"use client";

import Image from "next/image";
import Bag from "./icons/Bag";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { X } from "lucide-react";

function NavMenu() {
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

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return <></>;
  }

  return (
    <>
      <nav className="absolute left-1/2 z-[99] mt-6 flex w-full max-w-[1440px] -translate-x-1/2 items-center justify-between px-4 md:px-8 lg:px-20">
        <Image
          src="/logo.avif"
          alt="logo"
          className="h-auto w-auto cursor-pointer lg:w-18"
          width={75}
          height={68}
          onClick={() => {
            scroll(0, 0);
            router.push("/");
          }}
        />
        <div className="grid items-center justify-items-center gap-x-12 lg:grid-cols-[auto_auto]">
          <div
            className="relative hidden cursor-pointer lg:order-2 lg:block"
            onClick={() => router.push("/kosarica")}
          >
            <Bag
              className={`relative h-6 w-auto ${cart.length > 0 ? "fill-white" : ""}`}
            />
            {cart.length > 0 && (
              <p className="text-alert absolute top-0.5 left-1.5 text-[10px] font-medium md:top-1.5 md:left-[9px] md:text-xs">
                {cart.length}
              </p>
            )}
          </div>
          <div
            className="grid cursor-pointer gap-2 lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <div className="bg-primary h-[1.5px] w-9" />
            <div className="bg-primary h-[1.5px] w-9" />
          </div>
          <Links />
        </div>
      </nav>
      <PhoneLinks cart={cart} setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
}

function Links() {
  return (
    <div className="hidden items-center gap-12 lg:flex">
      <Link
        href="/spletna-trgovina"
        className="text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        Spletna trgovina
      </Link>
      <Link
        href="/o-nas"
        className="text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        O nas
      </Link>
      <Link
        href="/blog"
        className="text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        Blog
      </Link>
      <Link
        href="#contact"
        className="text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        Kontakt
      </Link>
    </div>
  );
}

function PhoneLinks({
  cart,
  isOpen,
  setIsOpen,
}: {
  cart: unknown[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <div
      className={`bg-primary text-neutral3 fixed top-0 left-0 z-[999] flex w-dvw flex-col items-center gap-14 text-center lg:hidden ${isOpen ? "h-dvh pt-16" : "h-0"} overflow-hidden transition-[height] duration-300`}
    >
      <X height={24} className="mb-4" onClick={() => setIsOpen(false)} />
      <Link
        href="/spletna-trgovina"
        className="hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        Spletna trgovina
      </Link>
      <Link
        href="/o-nas"
        className="hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        O nas
      </Link>
      <Link
        href="/blog"
        className="hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        Blog
      </Link>
      <Link
        href="#contact"
        className="hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
      >
        Kontakt
      </Link>
      <div
        className="relative cursor-pointer"
        onClick={() => router.push("/kosarica")}
      >
        <Bag
          className={`relative h-6 w-auto ${cart.length > 0 ? "fill-white" : ""}`}
          stroke="#EDEAE5"
        />
        {cart.length > 0 && (
          <p className="text-alert absolute top-1.5 left-[9px] text-xs font-medium">
            {cart.length}
          </p>
        )}
      </div>
    </div>
  );
}

export default NavMenu;
