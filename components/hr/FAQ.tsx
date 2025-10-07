import { H2 } from "@/components/Text";
import FAQCard from "@/components/FAQCard";
import LinkBtn from "@/components/LinkBtn";
import AniImage from "@/components/home/AniImage";

const qAndAs = [
  {
    q: "Mogu li zaista čistiti samo vodom?",
    a: (
      <>
        Da. Zahvaljujući naprednoj strukturi mikrovlakana, krpica učinkovito uklanja prljavštinu, prašinu i masnoću te do 99,8 % bakterija – bez uporabe sredstava za čišćenje. Voda je dovoljna za većinu površina, što znači manje kemikalija u vašem domu.
      </>
    ),
  },
  {
    q: "Koliko dugo traje krpica?",
    a: (
      <>
        Uz pravilno održavanje, krpica može trajati više godina. Svakim pranjem postaje sve mekša i stoga još ugodnija i učinkovitija za uporabu.
      </>
    ),
  },
  {
    q: "Kako se pere?",
    a: (
      <>
        Može se isprati samo mlazom vodom. Međutim, kada je već više prljava, može se prati u perilici rublja do 90 °C bez uporabe omekšivača. Također je važno da se pere s rubljem koje ne ostavlja mačiće. Suši se na otvorenom, bez korištenja sušilice.
      </>
    ),
  },
  {
    q: "Za koje je površine prikladna?",
    a: (
      <>
        Za brzo i učinkovito čišćenje bez pretjeranog napora, ističe se u:{" "}
        <ul className="mt-1 flex list-inside list-disc flex-col gap-1">
          <li>čišćenju prozora i ogledala;</li>{" "}
          <li>čišćenju kupaonice i drugih keramičkih površina;</li>{" "}
          <li>uklanjanju kamenca u početnoj fazi;</li>
          <li>
            uklanjanju raznih mrlja s tekstila, kože, tepiha...;
          </li>{" "}
          <li>
            uklanjanju masnih tragova prstiju na pametnim telefonima, naočalama, računalnim tipkovnicama...;
          </li>{" "}
          <li>čišćenju staklokeramičkih ploča</li>
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
        <H2>Često postavljana pitanja</H2>
        <div className="grid gap-8">
          {qAndAs.map((qa, i) => (
            <FAQCard key={qa.q} qa={qa} i={(i + 1).toString()} />
          ))}
        </div>
        <LinkBtn
          variant="secondary"
          href="/hr/spletna-trgovina"
          className="self-end"
        >
          ODABERI SVOJ PAKET
        </LinkBtn>
      </div>
    </div>
  );
}

export default FAQ;
