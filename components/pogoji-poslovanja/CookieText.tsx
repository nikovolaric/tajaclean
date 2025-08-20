"use client";

import Button from "../Button";
import { H2 } from "../Text";
import { acceptCookies, declineCookies } from "@/lib/cookieActions";

function CookieText({ accepted }: { accepted: boolean }) {
  return (
    <div className="flex flex-col gap-10 lg:gap-16">
      <H2>Nastavitve piškotkov</H2>
      <p>
        Ta spletna stran vsebuje t.i. piškotke (&quot;Cookies&quot;), zaradi
        uresničevanja namena nemotenega delovanja strani. Ko prvič obiščete
        spletno mesto, se v vaš računalnik shrani piškotek (če je brskalnik
        nastavljen tako, da jih sprejema), če ste spletno mesto že obiskali, pa
        spletni strežnik, prebere piškotek, shranjen v vašem računalniku.
        Piškotki se ne morejo uporabiti za pogon programov ali za prenos virusov
        na vaš računalnik.
        <br />
        <br />
        Na spletni strani se zbirajo podatki o obisku z uporabo storitve Google
        Analytics, spletno orodje podjetja Google Inc. (&quot;Google&quot;). V
        ta namen Google Analytics uporablja &quot;piškotke&quot;, ki so
        tekstovne datoteke, ob privolitvi nameščene na vašem računalniku.
        Piškotki Google Analytics se hranijo 2 leti.
        <br />
        <br />
        Trenutno vaš računalnik, poleg nujnih piškotkov za delovanje spletne
        strani, {accepted ? "" : "ne"} uporablja Google Analytics piškotkov. Te
        nastavitve lahko spremenite tukaj.
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
        <Button
          variant="primary"
          className="flex justify-center"
          onClick={acceptCookies}
        >
          Sprejmi piškotke
        </Button>
        <Button
          variant="complimentary"
          className="flex justify-center"
          onClick={declineCookies}
        >
          Zavrni in briši
        </Button>
      </div>
      <p>
        Podatki, ki jih piškotki vsebujejo o uporabi te spletne strani
        (standardni internetni dnevniški podatki (vključno z naslovom IP) in
        podatki o vedenju obiskovalcev v anonimni obliki) se prenesejo in
        shranijo pri podjetju Google, tudi na strežnikih v Združenih državah.
        Google bo poslane podatke pretvoril v anonimno obliko, tako da bo pred
        shranitvijo podatkov odstranil zadnji zlog naslova IP. V skladu s pogoji
        uporabe orodja Google Analytics bo podjetje Google te podatke uporabilo
        za ovrednotenje vaše uporabe spletne strani in izdelavo poročil za
        ANINEO, d.o.o o dejavnostih na spletni strani.
        <br />
        <br />
        Podjetje ANINEO, d.o.o. ne bo uporabilo niti dovolilo nobeni tretji
        osebi, da uporabi statistično analitično orodje za sledenje ali zbiranje
        podatkov o obiskovalcih te stani, ki omogočajo identifikacijo
        posameznika. Google lahko prenese podatke, zbrane z Google Analytics,
        tretjih osebam, če to zahteva zakon ali če tretje osebe obdelujejo
        podatke v imenu podjetja Google. V skladu s pogoji uporabe Google
        Analytics podjetje Google vašega naslova IP ne bo povezalo z nobenimi
        drugimi podatki, ki jih ima Google.
      </p>
    </div>
  );
}

export default CookieText;
