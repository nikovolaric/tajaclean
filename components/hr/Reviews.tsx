"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { H2 } from "@/components/Text";

const options = [
  {
    review:
      "Minimalistički, održivo i učinkovito – upravo ono što sam tražila. Operite krpice u stroju i bit će kao nove. Preporučujem ih svima kojima nije svejedno za okoliš.",
    author: "Petra L.",
    stars: 5,
  },
  {
    review:
      "Zbilja nisam vjerovala da jedna krpica može tako dobro očistiti bez sredstava za čišćenje. Koristim ih za sve – kuhinju, kupaonicu, čak i automobil. Top proizvod!",
    author: "Manca K.",
    stars: 5,
  },
  {
    review:
      "U početku sam bila skeptična, ali ove krpice zbilja djeluju. Površine su zaista čiste, bez mrlja, a još i bez kemikalija. Sada ih koristim svaki dan.",
    author: "Marija N.",
    stars: 5,
  },
  {
    review:
      "Koristim krpice TajaClean svaki dan – od kuhinje do kupaonice. Najbolja stvar je da mi ne trebaju sredstva za čišćenje i sve svijetli u minuti. Otkako ih koristim, manje me brine zdravlje moje obitelji.",
    author: "Ana V.",
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
              playsInline
              poster="/modri-poster.jpg"
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
        Povjerenje koje potvrđuju i korisnici krpica
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
