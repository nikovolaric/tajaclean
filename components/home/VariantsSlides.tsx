"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const options = [
  {
    name: "ZAČETNI PAKET",
    description:
      "Pametni paket vsebuje 3 čudežne krpice, v velikosti 40x40 cm.\n\nZa tiste, ki se prvič srečujete s čudežno krpico. Dovolj za osnovna gospodinjska opravila in popoln uvod v čistočo brez čistil.",
    price: 12.5,
    img: "/starter.jpg",
  },
  {
    name: "PAMETNI PAKET",
    description:
      "Pametni paket vsebuje 5 čudežnih krpic, v velikosti 40x40 cm.\n\nZa tiste, ki že veste, kako učinkovite so krpice TajaClean. Dovolj za več prostorov in vsakodnevno uporabo – praktična izbira za urejen dom.",
    price: 19.7,
    saving: 0.05,
    img: "/smart.jpg",
  },
  {
    name: "MODRI PAKET",
    description:
      "Pametni paket vsebuje 10 čudežnih krpic, v velikosti 40x40 cm.\n\nZa tiste, ki brez TAJA CLEAN ne morejo več. Dovolj krpic za celoten dom, avto, službo – in še ostane kakšna za deliti z drugimi.",
    price: 36.2,
    saving: 0.22,
    img: "/modri.jpg",
  },
];

function VariantsSlides() {
  const [slide, setSlide] = useState(1);

  function handleLeftClick() {
    if (slide === 0) {
      setSlide(2);
    } else {
      setSlide((slide) => slide - 1);
    }
  }

  function handleRightClick() {
    if (slide === 2) {
      setSlide(0);
    } else {
      setSlide((slide) => slide + 1);
    }
  }

  return (
    <div>
      <VariantsCard
        variant={options[slide]}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
    </div>
  );
}

function VariantsCard({
  variant,
  onLeftClick,
  onRightClick,
}: {
  variant: {
    name: string;
    description: string;
    price: number;
    saving?: number;
    img: string;
  };
  onLeftClick: () => void;
  onRightClick: () => void;
}) {
  const { name, description, price, saving, img } = variant;

  return (
    <div className="grid gap-8">
      <Image
        src={img}
        alt={name}
        width={340}
        height={280}
        className="h-auto w-full"
      />
      <div className="flex items-center justify-between">
        <ChevronLeft className="h-6" onClick={() => onLeftClick()} />
        <p className="bg-secondary1/35 border-primary text-primary flex h-11 items-center border px-9.5 font-semibold uppercase shadow-[inset_1px_1px_4px_rgba(0,0,0,0.25)]">
          {name}
        </p>
        <ChevronRight className="h-6" onClick={() => onRightClick()} />
      </div>
      <p className="whitespace-pre-line">{description}</p>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat("sl-SI", {
            style: "currency",
            currency: "EUR",
          }).format(price)}
        </p>
        {saving ? (
          <p className="text-secondary1">
            Vaš prihranek:{" "}
            {new Intl.NumberFormat("sl-SI", {
              style: "percent",
            }).format(saving)}
          </p>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

export default VariantsSlides;
