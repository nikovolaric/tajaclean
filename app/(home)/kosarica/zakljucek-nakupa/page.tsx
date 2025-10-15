import BuyerInfo from "@/components/kosarica/zakjucek/BuyerInfo";
import DeliveryInfo from "@/components/kosarica/zakjucek/DeliveryInfo";
import GoToPayment from "@/components/kosarica/zakjucek/GoToPayment";
import Summary from "@/components/kosarica/zakjucek/Summary";
import LinkBtn from "@/components/LinkBtn";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zaključek nakupa",
};

function Page() {
  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-14 lg:gap-20">
        <LinkBtn href="/kosarica" variant="secondary">
          NAZAJ NA UREJANJE KOŠARICE
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
