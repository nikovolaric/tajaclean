import PaymentMethod from "@/components/hr/kosarica/placilo/PaymentMethod";
import Summary from "@/components/hr/kosarica/zakjucek/Summary";
import LinkBtn from "@/components/LinkBtn";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plaćanje",
};

function Page() {
  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-14 lg:gap-20">
        <LinkBtn href="/hr/kosarica/zakljucek-nakupa" variant="secondary">
          NATRAG NA UREĐIVANJE PODATAKA
        </LinkBtn>
        <div className="flex flex-col gap-14 md:mx-auto md:w-2/3 xl:grid xl:w-full xl:grid-cols-[2fr_1fr] xl:gap-x-5">
          <PaymentMethod />
          <Summary />
        </div>
      </div>
    </>
  );
}

export default Page;
