import Hand from "../icons/Hand";
import Plant from "../icons/Plant";
import Recycle from "../icons/Recycle";
import Sun from "../icons/Sun";

function WhyUs() {
  return (
    <div className="bg-secondary1/15 ml-[calc(-50vw+50%)] w-[100vw] py-10 lg:py-16">
      <div className="mx-4 grid max-w-[1440px] grid-cols-2 justify-items-center gap-x-5 gap-y-8 md:mx-8 lg:mx-20 lg:grid-cols-4 xl:mx-auto xl:px-20">
        <div className="grid justify-items-center gap-6 lg:gap-12">
          <Hand />
          <p className="text-center lg:text-lg">Prihranek časa in denarja</p>
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
          <p className="text-center lg:text-lg">Čiščenje brez čistil</p>
        </div>
      </div>
    </div>
  );
}

export default WhyUs;
