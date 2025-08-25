"use client";

import Link from "next/link";
import { H3 } from "./Text";
import Button from "./Button";
import { useState } from "react";
import { acceptCookies, declineCookies } from "@/lib/cookieActions";

function CookieConsent() {
  const [isOpen, setIsOpen] = useState(true);

  function handleClick() {
    setIsOpen(false);
  }

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="fixed right-4 bottom-4 z-[999] flex h-fit w-fit max-w-[calc(100dvw-32px)] flex-col gap-6 bg-[#F6F4F2] p-4 shadow-[2px_2px_10px_rgba(0,0,0,0.25)] sm:max-w-158 sm:p-8 lg:right-20">
      <p
        className="absolute top-4 right-4 cursor-pointer font-semibold text-black/30"
        onClick={handleClick}
      >
        X
      </p>
      <H3 className="w-11/12 text-xl sm:text-2xl">
        Upravljanje soglasja za piškotke
      </H3>
      <p>
        Za zagotavljanje boljše uporabniške izkušnje in spremljanje statistike
        obiska, to spletno mesto uporablja piškotke. Svoje nastavitve lahko
        kadarkoli spremenite na zavihku{" "}
        <Link className="cursor-pointer underline" href="/pogoji-poslovanja">
          Nastavitve piškotkov.
        </Link>
      </p>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <Button
          variant="primary"
          className="flex justify-center"
          onClick={acceptCookies}
        >
          SPREJMI VSE PIŠKOTKE
        </Button>
        <Button
          variant="complimentary"
          className="flex justify-center"
          onClick={declineCookies}
        >
          ZAVRNI PIŠKOTKE
        </Button>
      </div>
    </div>
  );
}

export default CookieConsent;
