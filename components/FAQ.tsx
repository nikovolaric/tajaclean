import { H2 } from "./Text";
import FAQCard from "./FAQCard";
import LinkBtn from "./LinkBtn";
import AniImage from "./home/AniImage";

const qAndAs = [
  {
    q: "Ali res lahko čistim samo z vodo?",
    a: (
      <>
        Da. Zaradi napredne strukture mikrovlaken krpica učinkovito odstrani
        umazanijo, prah in maščobo in do 99,8 % bakterij – brez uporabe čistil.
        Voda zadostuje za večino površin, kar pomeni manj kemikalij v vašem
        domu.
      </>
    ),
  },
  {
    q: "Kako dolgo krpica zdrži?",
    a: (
      <>
        Ob pravilni negi lahko krpica zdrži več let. Z vsakim pranjem postane še
        mehkejša in zato še prijetnejša ter učinkovitejša za uporabo.
      </>
    ),
  },
  {
    q: "Kako jo perem?",
    a: (
      <>
        Lahko se spere samo pod tekočo vodo. Kadar pa je že bolj umazana, se
        lahko pere v pralnem stroju do 90°C brez uporabe mehčalca. Pomembno je
        tudi, da se pere s perilom, ki ne pušča muck. Suši se na prostem, brez
        uporabe sušilnega stroja.
      </>
    ),
  },
  {
    q: "Za katere površine je primerna?",
    a: (
      <>
        Za hitro in učinkovito čiščenje brez odvečnega truda se izvrstno izkaže
        pri:{" "}
        <ul className="mt-1 flex list-inside list-disc flex-col gap-1">
          <li>čiščenju oken in ogledal;</li>{" "}
          <li>čiščenju kopalniških in drugih keramičnih površin;</li>{" "}
          <li>odstranjevanju vodnega kamna v začetni fazi;</li>
          <li>
            odstranjevanju različnih madežev iz tekstila, usnja, preprog...;
          </li>{" "}
          <li>
            odstranjevanju maščob, nastalih zaradi stikov s kožo, na pametnih
            telefonih, očalih, računalniških tipkovnicah...;
          </li>{" "}
          <li>čiščenju steklokeramičnih plošč</li>
        </ul>
      </>
    ),
  },
];

function FAQ() {
  return (
    <div className="grid gap-10 md:mx-auto md:w-2/3 lg:w-full lg:grid-cols-2">
      <AniImage
        src="/brush.jpg"
        alt="slika sekcije"
        width={610}
        height={445}
        className="h-auto max-h-70 w-full object-cover lg:max-h-111"
      />
      <div className="flex flex-col gap-10 lg:gap-14">
        <H2>Pogosta vprašanja</H2>
        <div className="grid gap-8">
          {qAndAs.map((qa, i) => (
            <FAQCard key={qa.q} qa={qa} i={(i + 1).toString()} />
          ))}
        </div>
        <LinkBtn
          variant="secondary"
          href="/spletna-trgovina"
          className="self-end"
        >
          IZBERI SVOJ PAKET
        </LinkBtn>
      </div>
    </div>
  );
}

export default FAQ;
