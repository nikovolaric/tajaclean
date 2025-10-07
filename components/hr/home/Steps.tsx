import { H2, H3 } from "@/components/Text";
import AniImage from "@/components/home/AniImage";

const options = [
  {
    name: "NAMOČI",
    text: (
      <>Čudotvorna se krpica aktivira u vodi, bez dodatnih sredstava za čišćenje i kemikalija.</>
    ),
    img: "/wet.jpg",
  },
  {
    name: "OCIJEDI",
    text: (
      <>
        Prije uporabe <span className="font-semibold">dobro</span>{" "}
        ocijedite krpicu kako biste uklonili višak vode.
      </>
    ),
    img: "/squeeze.jpg",
  },
  {
    name: "OBRIŠI",
    text: (
      <>
        Spremna je za brisanje. Jedna krpica – za sve površine, bez napora.
      </>
    ),
    img: "/clean.jpg",
  },
];

function Steps() {
  return (
    <div className="grid gap-10 md:gap-15">
      <H2 className="md:text-center">Namoči, ocijedi, obriši, ponovi.</H2>
      <div className="grid gap-12 md:grid-cols-3 md:gap-x-5 md:text-center">
        {options.map((el, i) => (
          <div
            key={i}
            className={`flex flex-col gap-6 ${i === 1 ? "md:mt-[33%]" : i === 2 ? "md:mt-[66%]" : ""}`}
          >
            <AniImage
              src={el.img}
              alt={el.name}
              width={420}
              height={350}
              className="h-auto max-h-70 w-full object-cover lg:max-h-88"
            />
            <H3 className="text-lg md:text-xl">
              {(i + 1).toString().padStart(2, "0")} {el.name}
            </H3>
            <p>{el.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Steps;
