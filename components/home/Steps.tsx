import Image from "next/image";
import { H2, H3 } from "../Text";

const options = [
  {
    name: "ZMOČI",
    text: "Čudežno krpico aktiviramo v vodi, brez dodatnih čistil in kemikalij.",
    img: "/wet.jpg",
  },
  {
    name: "OŽEMI",
    text: "Krpico pred uporabo dobro ožamemo in odstranimo odvečno vodo.",
    img: "/squeeze.jpg",
  },
  {
    name: "BRIŠI",
    text: "Že smo pripravljeni na brisanje. Ena krpica - vse površine, brez napora.",
    img: "/clean.jpg",
  },
];

function Steps() {
  return (
    <div className="grid gap-10 md:gap-15">
      <H2 className="md:text-center">Zmoči, ožemi, briši, ponovi.</H2>
      <div className="grid gap-12 md:grid-cols-3 md:gap-x-5 md:text-center">
        {options.map((el, i) => (
          <div
            key={i}
            className={`flex flex-col gap-6 ${i === 1 ? "md:mt-[33%]" : i === 2 ? "md:mt-[66%]" : ""}`}
          >
            <Image
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
