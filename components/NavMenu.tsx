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

  useEffect(
    function () {
      if (!pathname.includes("/kosarica/zakljucek-nakupa")) {
        localStorage.removeItem("buyer");
        localStorage.removeItem("delivery");
        localStorage.removeItem("notes");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("subscribe");
        localStorage.removeItem("agrees");
      }
    },
    [pathname],
  );

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

  const cro = pathname.startsWith("/hr");

  return (
    <>
      <nav className="absolute left-1/2 z-[99] mt-10 flex w-full max-w-[1440px] -translate-x-1/2 items-center justify-between px-4 md:px-8 lg:px-20">
        <Image
          src="/logo.avif"
          alt="logo"
          className="h-auto w-auto cursor-pointer lg:w-18"
          width={75}
          height={68}
          onClick={() => {
            scroll(0, 0);
            if (pathname.startsWith("/hr")) {
              router.push("/hr");
            } else {
              router.push("/");
            }
          }}
        />
        <div className="grid items-center justify-items-center gap-x-12 lg:grid-cols-[auto_auto]">
          <div
            className="relative hidden cursor-pointer lg:order-2 lg:block"
            onClick={() => {
              if (cro) {
                router.push("/hr/kosarica");
              } else {
                router.push("/kosarica");
              }
            }}
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
  const pathname = usePathname();

  const cro = pathname.startsWith("/hr");

  return (
    <div className="hidden items-center gap-12 lg:flex">
      <Link
        href={`${cro ? "/hr" : ""}/spletna-trgovina`}
        className={`text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200 ${pathname === "/spletna-trgovina" ? "underline" : ""}`}
      >
        {cro ? "Online trgovina" : "Spletna trgovina"}
      </Link>
      <Link
        href={`${cro ? "/hr" : ""}/o-nas`}
        className={`text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200 ${pathname === "/o-nas" ? "underline" : ""}`}
      >
        {cro ? "O nama" : "O nas"}
      </Link>
      <Link
        href={`${cro ? "/hr" : ""}/blog`}
        className={`text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200 ${pathname === "/blog" ? "underline" : ""}`}
      >
        Blog
      </Link>
      <Link
        href="#contact"
        className={`text-primary hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200`}
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
  const pathname = usePathname();
  const router = useRouter();
  function handleClick() {
    setIsOpen(false);
  }

  const cro = pathname.startsWith("/hr");

  return (
    <div
      className={`bg-primary text-neutral3 fixed top-0 left-0 z-[999] flex w-dvw flex-col items-center gap-14 text-center lg:hidden ${isOpen ? "h-dvh pt-16" : "h-0"} overflow-hidden transition-[height] duration-300`}
    >
      <X height={24} className="mb-4" onClick={() => setIsOpen(false)} />
      <Link
        href={`${cro ? "/hr" : ""}/spletna-trgovina`}
        className={`hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200 ${pathname === "/spletna-trgovina" ? "underline" : ""}`}
        onClick={handleClick}
      >
        {cro ? "Online trgovina" : "Spletna trgovina"}
      </Link>
      <Link
        href={`${cro ? "/hr" : ""}/o-nas`}
        className={`hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200 ${pathname === "/o-nas" ? "underline" : ""}`}
        onClick={handleClick}
      >
        {cro ? "O nama" : "O nas"}
      </Link>
      <Link
        href={`${cro ? "/hr" : ""}/blog`}
        className={`hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200 ${pathname === "/blog" ? "underline" : ""}`}
        onClick={handleClick}
      >
        Blog
      </Link>
      <Link
        href="#contact"
        className="hover:text-secondary1 cursor-pointer text-sm font-medium uppercase transition-colors duration-200"
        onClick={handleClick}
      >
        Kontakt
      </Link>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          if (cro) {
            router.push("/hr/kosarica");
          } else {
            router.push("/kosarica");
          }
          setIsOpen(false);
        }}
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
