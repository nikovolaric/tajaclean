import Image from "next/image";
import { H2 } from "../Text";
import LinkBtn from "../LinkBtn";

function WhatAreMicroFibers() {
  return (
    <div className="grid gap-10 md:mx-auto md:w-2/3 xl:w-full xl:grid-cols-2 xl:gap-x-5">
      <Image
        src="/packs.jpg"
        alt="Paketi"
        width={610}
        height={450}
        className="h-auto max-h-70 w-full object-cover md:max-h-90 lg:max-h-100 xl:order-2 xl:max-h-120"
      />
      <div className="grid gap-10 xl:gap-14">
        <H2>Kaj so in zakaj mikrovlakna?</H2>
        <p>
          Revolucionarni tekstilni material, iz ekstremno dolgih
          mikrofilamentov. Ponaša se z izjemno učinkovitostjo pri čiščenju,
          brisanju, poliranju in sušenju (suši se 3x hitreje od bombaža). Ima
          izredne vpojne lastnosti (vpije do 400% svoje teže). Z lahkoto
          odstrani umazanijo, prah, tekočine, maščobe in obarvanost. Odlična je
          za uporabo tako v gospodinjstvu, kot tudi v industriji.
          <br />
          <br />
          Krpica Taja CLEAN je stisnjena iz mikrovlaken in ne tkana kot ostale
          krpe. Njena trda in trpežna sestava omogoča, da lažje drgnemo
          trdovratne umazanije, brez poškodb na površini. Miljarde prepletenih
          mikrofilamentov delujejo kot grabilčki, ki lovijo drobne delce
          umazanije in bakterije kot magnet, ter za sabo puščajo samo čisto
          površino.
        </p>
        <LinkBtn
          href="/o-nas"
          variant="primary"
          className="self-center justify-self-center py-1 text-center sm:py-0 lg:w-full lg:justify-center"
        >
          PREBERI VEČ O TAJACLEAN KRPICI
        </LinkBtn>
      </div>
    </div>
  );
}

export default WhatAreMicroFibers;
