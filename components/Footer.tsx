import Image from "next/image";
import Link from "next/link";
import IGIcon from "./icons/IGIcon";
import FBIcon from "./icons/FBIcon";

function Footer() {
  return (
    <footer
      className="mt-35 mb-20 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3"
      id="contact"
    >
      <Image
        src="/footerLogo.svg"
        alt="Logotip"
        height={110}
        width={110}
        className="col-span-2 h-27.5 w-auto lg:col-span-3"
      />
      <div>
        <h4 className="font-lora mb-8 font-medium">Podatki podjetja</h4>
        <p className="leading-6">
          ANINEO, d.o.o.
          <br />
          Trške gorce 1<br />
          3252 Rogatec
          <br />
          Slovenija
        </p>
      </div>
      <div>
        <h4 className="font-lora mb-8 font-medium">Spletna stran</h4>
        <div className="flex flex-col">
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
      <div className="grid gap-10">
        <div>
          <h4 className="font-lora mb-8 font-medium">Kontakt</h4>
          <p className="leading-6">
            anja@tajaclean.si
            <br />
            +386 40 306 996
          </p>
        </div>
        <div className="flex items-center gap-6">
          <FBIcon className="cursor-pointer" />
          <IGIcon className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
