"use client";

import Button from "@/components/Button";
import { H2 } from "@/components/Text";
import { acceptCookies, declineCookies } from "@/lib/cookieActions";

function CookieText({ accepted }: { accepted: boolean }) {
  return (
    <div className="flex flex-col gap-10 lg:gap-16">
      <H2>Postavke kolačića</H2>
      <p>
        Ova web stranica sadrži takozvane kolačiće („Kolačići“) kako bi se
        postigla svrha nesmetanog rada web stranice. Kada prvi put posjetite web
        stranicu, kolačić se pohranjuje na vaše računalo (ako je vaš preglednik
        postavljen da ih prihvaća), a ako ste već posjetili web stranicu, web
        poslužitelj očitava kolačić pohranjen na vašem računalu. Kolačići se ne
        mogu koristiti za pokretanje programa ili za prijenos virusa na vaše
        računalo.
        <br />
        <br />
        Web stranica prikuplja podatke o vašem posjetu pomoću Google Analyticsa,
        web alata tvrtke Google Inc. („Google“). U tu svrhu Google Analytics
        koristi „kolačiće“, tekstualne datoteke koje se instaliraju na vaše
        računalo uz vaš pristanak. Kolačići Google Analyticsa pohranjuju se 2
        godine.
        <br />
        <br />
        Trenutno vaše računalo, osim kolačića potrebnih za funkcioniranje web
        stranice, {accepted ? "" : "ne"} koristi kolačiće Google Analyticsa. Ove
        postavke možete promijeniti ovdje.
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
        <Button
          variant="primary"
          className="flex justify-center"
          onClick={acceptCookies}
        >
          Prihvati kolačiće
        </Button>
        <Button
          variant="complimentary"
          className="flex justify-center"
          onClick={declineCookies}
        >
          Odbij i izbriši
        </Button>
      </div>
      <p>
        Informacije sadržane u kolačićima o vašoj upotrebi ove web stranice
        (standardni podaci internetskog dnevnika (uključujući vašu IP adresu) i
        podaci o ponašanju posjetitelja u anonimnom obliku) prenose se i
        pohranjuju od strane Googlea, uključujući i na poslužiteljima u
        Sjedinjenim Američkim Državama. Google će anonimizirati podatke koje ste
        poslali uklanjanjem posljednjeg znaka vaše IP adrese prije pohranjivanja
        podataka. U skladu s uvjetima korištenja usluge Google Analytics, Google
        će koristiti ove podatke za procjenu vaše upotrebe web stranice i za
        izradu izvješća za ANINEO, d.o.o. o aktivnosti na web stranici.
        <br />
        <br />
        ANINEO, d.o.o. neće koristiti niti dopustiti trećim stranama da koriste
        alate za statističku analizu za praćenje ili prikupljanje osobnih
        podataka o posjetiteljima ove web stranice. Google može prenijeti
        podatke prikupljene putem usluge Google Analytics trećim stranama ako to
        zahtijeva zakon ili ako treće strane obrađuju podatke u ime Googlea.
        Prema Uvjetima korištenja usluge Google Analytics, Google neće
        povezivati ​​vašu IP adresu s bilo kojim drugim podacima koje posjeduje
        Google.
      </p>
    </div>
  );
}

export default CookieText;
