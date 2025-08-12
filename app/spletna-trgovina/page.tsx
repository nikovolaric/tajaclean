import { type Metadata } from "next";
import FAQ from "@/components/FAQ";
import PageHeader from "@/components/PageHeader";
import Reviews from "@/components/Reviews";
import WhyUs from "@/components/spletna-trgovina/WhyUs";
import Articles from "@/components/spletna-trgovina/Articles";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import FreeDeliveryTag from "@/components/FreeDeliveryTag";

export const metadata: Metadata = {
  title: "Spletna trgovina",
};

function Page() {
  return (
    <>
      <PageHeader page="SPLETNA TRGOVINA">
        Ena krpica - trije paketi. Izberite svojega!
      </PageHeader>
      <main>
        <Suspense fallback={<Spinner />}>
          <Articles />
        </Suspense>
        <WhyUs />
        <Reviews />
        <FAQ />
      </main>
      <FreeDeliveryTag />
    </>
  );
}

export default Page;
