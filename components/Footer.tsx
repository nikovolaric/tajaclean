"use client";

import Image from "next/image";
import Link from "next/link";
import IGIcon from "./icons/IGIcon";
import FBIcon from "./icons/FBIcon";
import { usePathname } from "next/navigation";
import LinkBtn from "./LinkBtn";

function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return <></>;
  }

  return (
    <footer
      className="mt-35 mb-20 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3"
      id="contact"
    >
      <div>
        <h4 className="font-lora mb-8 font-medium">Politika zasebnosti</h4>
        <div className="grid gap-2">
          <LinkBtn variant="secondary" href="/pogoji-poslovanja">
            NASTAVITVE PIŠKOTKOV
          </LinkBtn>
          <LinkBtn variant="secondary" href="/pogoji-poslovanja">
            POGOJI POSLOVANJA
          </LinkBtn>
        </div>
      </div>
      <div>
        <h4 className="font-lora mb-8 font-medium">Spletna stran</h4>
        <div className="flex flex-col">
          <Link
            className="hover:text-secondary1 leading-6 uppercase transition-colors duration-200"
            href="/"
          >
            Domača stran
          </Link>
          <Link
            className="hover:text-secondary1 leading-6 uppercase transition-colors duration-200"
            href="/spletna-trgovina"
          >
            Spletna trg.
          </Link>
          <Link
            className="hover:text-secondary1 leading-6 uppercase transition-colors duration-200"
            href="/o-nas"
          >
            O nas
          </Link>
          <Link
            className="hover:text-secondary1 leading-6 uppercase transition-colors duration-200"
            href="/blog"
          >
            Blog
          </Link>
        </div>
      </div>
      <div className="col-span-2 grid gap-10 lg:col-span-1">
        <div>
          <h4 className="font-lora mb-8 font-medium">Kontakt</h4>
          <p className="leading-6">
            anja@tajaclean.si
            <br />
            <a href="tel:+38640306996">+386 40 306 996</a>
          </p>
        </div>
        <div className="flex items-center gap-6">
          <Link href="https://www.facebook.com/tajaclean" target="_blank">
            <FBIcon className="cursor-pointer" />
          </Link>
          <Link href="https://www.instagram.com/tajaclean/" target="_blank">
            <IGIcon className="cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-6 lg:col-span-3 lg:mt-6 lg:flex-row lg:justify-between">
        <p>
          &copy;{new Date().getFullYear()}, ANINEO, d.o.o. Vse pravice
          pridržane.
        </p>
        <p>
          Spletni razvoj in oblikovanje:{" "}
          <Link href="https://www.lamastrategies.com" target="_blank">
            LAMA Strategies
          </Link>{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
