import { H3 } from "../Text";
import { LeafIcon } from "lucide-react";
import AniImage from "../home/AniImage";

const techs = [
  {
    title: "IZBRANA TEHNOLOGIJA MIKROVLAKEN",
    text: "Stisnjeni mikrofilamenti namesto običajnih tkanin povečajo učinkovitost in vzdržljivost čudežne krpice.",
  },
  {
    title: "TRAJNOSTNI PREMIK",
    text: "Krpice so bile zasnovane kot trajnostna alternativa papirnatim brisačkam in kemičnim čistilom, ki onesnažujejo okolje.",
  },
  {
    title: "DOLGOROČNA UČINKOVITOST",
    text: "Po številnih letih testiranja, se je izkazalo, da krpica zdrži stotine pranj z majhno izgubo učinkovitosti, kar je odlično razmerje med ceno in trajnostjo.",
  },
];

function Technology() {
  return (
    <div className="grid gap-10 md:mx-auto md:w-2/3 xl:w-full xl:grid-cols-2 xl:gap-x-5">
      <AniImage
        src="/hang.jpg"
        alt="Paketi"
        width={1000}
        height={800}
        className="h-auto max-h-70 w-full object-cover md:max-h-90 lg:max-h-100 xl:max-h-120"
      />
      <div className="grid gap-10 xl:gap-14">
        {techs.map((tech) => (
          <div key={tech.title} className="grid gap-6">
            <H3 className="flex items-center gap-4">
              <LeafIcon className="text-secondary1 stroke-1" />
              {tech.title}
            </H3>
            <p>{tech.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Technology;
