import { H2 } from "@/components/Text";
import LinkBtn from "@/components/LinkBtn";
import AniImage from "@/components/home/AniImage";

function WhatAreMicroFibers() {
  return (
    <div className="grid gap-10 md:mx-auto md:w-2/3 xl:w-full xl:grid-cols-2 xl:gap-x-5">
      <AniImage
        src="/packs.jpg"
        alt="Paketi"
        width={610}
        height={450}
        className="h-auto max-h-70 w-full object-cover md:max-h-90 lg:max-h-100 xl:order-2 xl:max-h-120"
      />
      <div className="grid gap-10 xl:gap-14">
        <H2>Što je TajaClean?</H2>
        <p>
          Revolucionarna krpa za čišćenje komprimirana je od mikrovlakana i nije tkana kao druge krpe. Osmišljena kako ne bi ostavljala grudaste nakupine ili tragove. Njezin tvrd i izdržljiv sastav olakšava trljanje tvrdokorne prljavštine bez oštećenja površine. Milijarde isprepletenih mikrofilamenata djeluju kao hvatači koji hvataju i zadržavaju čak i najmanje čestice prljavštine. Čak briše bakterije, ostavljajući samo čistu površinu.
          <br />
          <br />
          Može se pohvaliti iznimnom učinkovitošću čišćenja, poliranja i sušenja (suši se 3-struko brže od pamuka). Odlikuju je izvanredna apsorpcijska svojstva (upija do 400 % svoje mase). Lako uklanja prljavštinu, prašinu, tekućine, masnoću i obojenost. Izvrsna je za uporabu u kućanstvu, a i industriji. 
        </p>
        <LinkBtn
          href="/hr/o-nas"
          variant="primary"
          className="self-center justify-self-center py-1 text-center sm:py-0 lg:w-full lg:justify-center"
        >
          PROČITAJ VIŠE O KRPICI TAJACLEAN
        </LinkBtn>
      </div>
    </div>
  );
}

export default WhatAreMicroFibers;
