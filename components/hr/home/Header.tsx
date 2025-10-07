import img from "@/public/homeBg.jpg";
import Image from "next/image";
import { H1 } from "@/components/Text";
import LinkBtn from "@/components/LinkBtn";

function Header() {
  return (
    <header className="relative ml-[calc(-50vw+50%)] h-170 w-[100vw] lg:h-200">
      <Image
        src={img}
        alt="Slika ozadja"
        fill
        className="object-cover opacity-55"
        sizes="100vw"
        priority
      />
      <div className="animate-start relative mx-4 grid max-w-[1440px] justify-items-start gap-10 pt-70 md:mx-8 md:justify-items-center md:gap-12 md:pt-80 lg:mx-20 lg:pt-93 xl:mx-auto xl:px-20">
        <H1>Jedna krpica – za sve površine.</H1>
        <p className="max-w-[662px] md:text-center lg:text-xl">
          Čudotvorna krpica TajaClean pruža svakoj površini prirodni sjaj, bez uporabe sredstava za čišćenje i drugih agresivnih kemikalija.
        </p>
        <LinkBtn href="/hr/spletna-trgovina" variant="primary">
          Kupi svoju krpicu
        </LinkBtn>
      </div>
    </header>
  );
}

export default Header;
