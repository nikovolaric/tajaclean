import { H2 } from "./Text";
import FAQCard from "./FAQCard";
import LinkBtn from "./LinkBtn";
import AniImage from "./home/AniImage";

const qAndAs = [
  {
    q: "Ali res lahko čistim samo z vodo?",
    a: "Da. Zaradi napredne strukture mikrovlaken krpica učinkovito odstrani umazanijo, prah in maščobo in do 99,8 % bakterij – brez uporabe čistil. Voda zadostuje za večino površin, kar pomeni manj kemikalij v vašem domu.",
  },
  {
    q: "Kako dolgo krpica zdrži?",
    a: "Da. Zaradi napredne strukture mikrovlaken krpica učinkovito odstrani umazanijo, prah in maščobo – brez uporabe čistil. Voda je dovolj za večino površin, kar pomeni manj kemikalij v vašem domu.",
  },
  {
    q: "Kako jo perem?",
    a: "Da. Zaradi napredne strukture mikrovlaken krpica učinkovito odstrani umazanijo, prah in maščobo – brez uporabe čistil. Voda je dovolj za večino površin, kar pomeni manj kemikalij v vašem domu.",
  },
  {
    q: "Za katere površine je primerna?",
    a: "Da. Zaradi napredne strukture mikrovlaken krpica učinkovito odstrani umazanijo, prah in maščobo – brez uporabe čistil. Voda je dovolj za večino površin, kar pomeni manj kemikalij v vašem domu.",
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
