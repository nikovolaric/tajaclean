"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { H2 } from "./Text";

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
  {
    review:
      "Sprva sem bila skeptična, ampak te krpice dejansko delujejo. Površine so res čiste, brez lis, pa še brez kemikalij. Zdaj jih uporabljam vsak dan.",
    author: "Marija N.",
    stars: 5,
  },
];

const videos = [
  "/videos/cevljiskrpico.mp4",
  "/videos/pipabeforeafter.mp4",
  "/videos/okna.mp4",
  "/videos/avto.mp4",
];

export function Reviews() {
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
      <div className="mx-4 grid max-w-[1440px] md:mx-8 lg:mx-20 lg:grid-cols-[5fr_7fr] lg:gap-x-10 xl:mx-auto xl:px-20">
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
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video, i) => (
            <video
              autoPlay
              height="228"
              width="165"
              key={i}
              muted
              loop
              className={`${i % 2 === 1 ? "translate-y-5" : "-translate-y-5"} ${i === 3 ? "lg:hidden xl:block" : ""}`}
            >
              <source type="video/mp4" src={video} />
            </video>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StoreReviews() {
  const [slide, setSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  const maxSlide = options.length - visibleSlides;

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth >= 1024) {
        setVisibleSlides(3);
      } else if (window.innerWidth >= 768) {
        setVisibleSlides(2);
      } else {
        setVisibleSlides(1);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  function handleLeftClick() {
    setSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
  }

  function handleRightClick() {
    setSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
  }

  return (
    <div className="bg-secondary1/15 ml-[calc(-50vw+50%)] w-[100vw] py-10 lg:py-16">
      <H2 className="mb-18 text-center">
        Zaupanje, ki ga potrjujejo tudi uporabniki krpic
      </H2>
      <div className="relative mx-4 max-w-[1440px] md:mx-8 lg:mx-20 xl:mx-auto xl:px-20">
        <div className="mx-auto w-5/6 overflow-x-hidden">
          <div
            className="mx-auto flex items-center transition-transform duration-500"
            style={{
              transform: `translateX(-${(slide * 100) / visibleSlides}%)`,
            }}
          >
            {options.map((el, i) => (
              <div
                key={i}
                className="grid w-full flex-none gap-6 px-2 md:w-1/2 lg:w-1/3"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      height={16}
                      className={`${i + 1 <= options[slide].stars ? "fill-[#BE9B43] text-[#BE9B43]" : "fill-secondary1 text-secondary1"}`}
                      key={(i + 1) * 100}
                    />
                  ))}
                </div>
                <p>{el.review}</p>
                <p className="font-lora text-secondary1 font-semibold">
                  {el.author}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 mx-auto flex h-full w-full items-center justify-between xl:px-20">
          <ChevronLeft
            height={24}
            className="text-secondary1 cursor-pointer"
            onClick={handleLeftClick}
          />
          <ChevronRight
            height={24}
            className="text-secondary1 cursor-pointer"
            onClick={handleRightClick}
          />
        </div>
      </div>
    </div>
  );
}
