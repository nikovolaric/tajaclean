"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

const options = [
  {
    review:
      "Minimalistično, ekološko in učinkovito – točno to, kar sem iskala. Krpice pereš v stroju in so kot nove. Priporočam vsem, ki jim ni vseeno za okolje.",
    author: "Petra L.",
    stars: 5,
  },
  {
    review:
      "Resno nisem verjela, da lahko ena krpica tako dobro očisti brez čistil. Uporabljam jih za vse – kuhinjo, kopalnico, celo za avto. Top produkt!",
    author: "Manca K.",
    stars: 5,
  },
  {
    review:
      "Sprva sem bila skeptična, ampak te krpice dejansko delujejo. Površine so res čiste, brez lis, pa še brez kemikalij. Zdaj jih uporabljam vsak dan.",
    author: "Marija N.",
    stars: 5,
  },
];

function Reviews() {
  const [slide, setSlide] = useState(0);

  function handleLeftClick() {
    if (slide === 0) {
      setSlide(options.length - 1);
    } else {
      setSlide((slide) => slide - 1);
    }
  }

  function handleRightClick() {
    if (slide === options.length - 1) {
      setSlide(0);
    } else {
      setSlide((slide) => slide + 1);
    }
  }

  return (
    <div className="bg-secondary1/15 ml-[calc(-50vw+50%)] w-[100vw] py-10 lg:py-16">
      <div className="mx-4 grid max-w-[1440px] md:mx-8 lg:mx-20 lg:grid-cols-[5fr_7fr] lg:gap-x-5 xl:mx-auto xl:px-20">
        <div className="grid gap-8">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                height={16}
                className={`${i + 1 <= options[slide].stars ? "fill-[#BE9B43] text-[#BE9B43]" : "fill-secondary1 text-secondary1"}`}
                key={(i + 1) * 100}
              />
            ))}
          </div>
          <p>{options[slide].review}</p>
          <p className="font-lora text-secondary1 mt-8 text-lg font-semibold">
            {options[slide].author}
          </p>
          <div className="flex items-center gap-4 justify-self-end">
            <button
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white"
              onClick={handleLeftClick}
            >
              <ArrowLeft height={24} className="text-secondary1" />
            </button>
            <button
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white"
              onClick={handleRightClick}
            >
              <ArrowRight height={24} className="text-secondary1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
