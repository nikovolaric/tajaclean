import Hand from "../icons/Hand";
import Plant from "../icons/Plant";
import Recycle from "../icons/Recycle";
import Sun from "../icons/Sun";
import { H2 } from "../Text";

function WhyUs() {
  return (
    <div className="grid gap-12 py-10 lg:py-16">
      <H2 className="text-center">
        Zakaj je TajaClean vaša{" "}
        <span className="italic">najboljša izbira?</span>
      </H2>
      <div className="grid grid-cols-2 justify-items-center gap-x-5 gap-y-8 lg:grid-cols-4">
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Hand />
          <p className="text-center lg:text-lg">Prihranite denar</p>
        </div>
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Recycle />
          <p className="text-center lg:text-lg">Večkratna uporaba</p>
        </div>
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Sun />
          <p className="text-center lg:text-lg">Brez muck in sledi</p>
        </div>
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Plant />
          <p className="text-center lg:text-lg">Okolju prijazna</p>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
