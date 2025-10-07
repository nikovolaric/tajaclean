import Link from "next/link";
import FBIcon from "@/components/icons/FBIcon";
import IGIcon from "@/components/icons/IGIcon";
import { H2 } from "@/components/Text";

function Comunity() {
  return (
    <div className="bg-secondary1/15 ml-[calc(-50vw+50%)] w-[100vw] py-10 lg:py-16">
      <div className="mx-4 grid max-w-[1440px] gap-10 md:mx-8 lg:mx-20 xl:mx-auto xl:px-20">
        <H2 className="text-center md:mx-auto md:w-2/3 lg:w-1/3">
          Postanite dio naše zajednice i pratite nas na društvenim mrežama.
        </H2>
        <div className="flex items-center justify-center gap-10">
          <Link href="https://www.facebook.com/tajaclean" target="_blank">
            <FBIcon className="cursor-pointer" />
          </Link>
          <Link href="https://www.instagram.com/tajaclean/" target="_blank">
            <IGIcon className="cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Comunity;
