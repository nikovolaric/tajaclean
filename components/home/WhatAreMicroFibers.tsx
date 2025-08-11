import { H2 } from "../Text";
import LinkBtn from "../LinkBtn";
import AniImage from "./AniImage";

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
        <H2>Kaj je TajaClean?</H2>
        <p>
          Revolucionarna čistilna krpa je stisnjena iz mikrovlaken in ne tkana
          kot ostale krpe. Zasnovana tako, da ne pušča muck ali sledi. Njena
          trda in trpežna sestava omogoča, da lažje drgnemo trdovratne
          umazanije, brez poškodb na površini. Milijarde prepletenih
          mikrofilamentov delujejo kot grabilčki, ki ujamejo in zadržijo tudi
          najmanjše delce umazanije. Pobriše celo bakterije, ter za sabo pusti
          samo čisto površino.
          <br />
          <br />
          Ponaša se z izjemno učinkovitostjo pri čiščenju, poliranju in sušenju
          (suši se 3x hitreje od bombaža). Ima izredne vpojne lastnosti (vpije
          do 400% svoje teže). Z lahkoto odstrani umazanijo, prah, tekočine,
          maščobo in obarvanost. Odlična je za uporabo tako v gospodinjstvu, kot
          tudi v industriji.
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
