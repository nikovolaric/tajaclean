import Image from "next/image";
import { H2 } from "@/components/Text";

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
            Tko smo i koja je naša misija?
          </H2>
          <p>
            TajaClean se razvio iz želje za učinkovitim, ekološki prihvatljivim
            čišćenjem - bez kemijskih sredstava za čišćenje i viška ambalaže.
            Već u prvim proizvodima njihov se razvoj temelji na revolucionarnoj
            tehnologiji mikrovlakana koja omogućuje dvostruku funkciju: dubinsko
            čišćenje površina i prirodnu dezinfekciju samo vodom – bez
            kemikalija.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhoAreWe;
