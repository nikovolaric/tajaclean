import BuyerInfo from "@/components/kosarica/zakjucek/BuyerInfo";
import DeliveryInfo from "@/components/kosarica/zakjucek/DeliveryInfo";
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
          <LinkBtn
            variant="primary"
            href="/kosarica/zakljucek-nakupa/placilo"
            className="flex justify-center xl:order-9 xl:w-3/4"
          >
            Nadaljuj na plačilo
          </LinkBtn>
        </div>
      </div>
    </>
  );
}

export default Page;
