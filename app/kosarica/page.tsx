import Cart from "@/components/kosarica/Cart";
import Discount from "@/components/kosarica/Discount";
import TotalPrice from "@/components/kosarica/TotalPrice";
import LinkBtn from "@/components/LinkBtn";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Košarica",
};

function Page() {
  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-6 lg:gap-10">
        <LinkBtn href="/spletna-trgovina" variant="secondary">
          NAZAJ V SPLETNO TRGOVINO
        </LinkBtn>
        <Cart />
        <TotalPrice />
        <div className="grid gap-18 md:mx-auto md:w-2/3 md:gap-x-5 lg:w-full lg:grid-cols-[4fr_6fr] xl:w-5/6">
          <Discount />
          <LinkBtn
            href="/kosarica/zakljucek-nakupa"
            variant="primary"
            className="flex justify-center"
          >
            Nadaljuj na blagajno
          </LinkBtn>
        </div>
      </div>
    </>
  );
}

export default Page;
