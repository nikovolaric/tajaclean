import BuyerInfo from "@/components/hr/kosarica/zakjucek/BuyerInfo";
import DeliveryInfo from "@/components/hr/kosarica/zakjucek/DeliveryInfo";
import GoToPayment from "@/components/hr/kosarica/zakjucek/GoToPayment";
import Summary from "@/components/hr/kosarica/zakjucek/Summary";
import LinkBtn from "@/components/LinkBtn";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Završetak kupnje",
};

function Page() {
  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-14 lg:gap-20">
        <LinkBtn href="/hr/kosarica" variant="secondary">
          NATRAG NA UREĐIVANJE KOŠARICE
        </LinkBtn>
        <div className="flex flex-col gap-14 md:mx-auto md:w-2/3 xl:grid xl:w-full xl:grid-cols-[2fr_1fr] xl:gap-x-5">
          <Summary />
          <BuyerInfo />
          <DeliveryInfo />
          <GoToPayment />
        </div>
      </div>
    </>
  );
}

export default Page;
