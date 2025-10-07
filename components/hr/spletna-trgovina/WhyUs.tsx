import Hand from "@/components/icons/Hand";
import Plant from "@/components/icons/Plant";
import Recycle from "@/components/icons/Recycle";
import Sun from "@/components/icons/Sun";
import { H2 } from "@/components/Text";

function WhyUs() {
  return (
    <div className="grid gap-12 py-10 lg:py-16">
      <H2 className="text-center">Zašto je TajaClean vaš najbolji izbor?</H2>
      <div className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-8 lg:grid-cols-4">
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Hand />
          <p className="text-center lg:text-lg">Ušteda novca</p>
        </div>
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Recycle />
          <p className="text-center lg:text-lg">Višekratna uporaba</p>
        </div>
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Sun />
          <p className="text-center lg:text-lg">
            Bez grudastih nakupina i tragova
          </p>
        </div>
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Plant />
          <p className="text-center lg:text-lg">Ekološki prihvatljiva</p>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
