import { H3 } from "@/components/Text";
import { LeafIcon } from "lucide-react";
import AniImage from "@/components/home/AniImage";

const techs = [
  {
    title: "ODABRANA TEHNOLOGIJA MIKROVLAKANA",
    text: "Komprimirani mikrofilamenti umjesto konvencionalnih tkanina povećavaju učinkovitost i trajnost čudotvorne krpice.",
  },
  {
    title: "ODRŽIVI POMAK",
    text: "Krpice su osmišljene kao održiva alternativa papirnatim ubrusima i kemijskim sredstvima za čišćenje koja zagađuju okoliš.",
  },
  {
    title: "DUGOROČNA UČINKOVITOST",
    text: "Nakon niza godina testiranja, pokazalo se da krpica podnosi stotine pranja s malim gubitkom učinkovitosti, što je izvrstan omjer cijene i trajnosti.",
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
