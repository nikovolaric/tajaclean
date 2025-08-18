import Image from "next/image";
import { H2 } from "../Text";

function WhoAreWe() {
  return (
    <div className="bg-secondary1/15 ml-[calc(-50vw+50%)] w-[100vw] py-10 lg:py-16">
      <div className="mx-4 grid max-w-[1440px] gap-10 md:mx-auto md:w-2/3 md:px-8 xl:mx-auto xl:w-full xl:grid-cols-2 xl:items-center xl:gap-x-5 xl:px-20">
        <Image
          src="/cleaning.jpg"
          alt="Paketi"
          width={1000}
          height={800}
          className="h-auto max-h-70 w-full object-cover md:max-h-90 lg:max-h-100 xl:order-2 xl:max-h-120"
        />
        <div className="flex flex-col gap-10 xl:gap-14">
          <H2 className="text-xl lg:text-2xl">
            Kdo smo in kaj je naša misija?
          </H2>
          <p>
            TajaClean se je razvila iz želje po učinkovitem, okolju prijaznem
            čiščenju - brez kemičnih čistil in odvečne embalaže. Že v prvih
            izdelkih njihov razvoj temelji na revolucionarni tehnologiji
            mikrovlaken, ki omogočajo dvojno funkcijo: globoko čistijo površine
            in jih naravno razkužijo le z vodo - brez kemikalij.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhoAreWe;
