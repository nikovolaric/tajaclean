import { type Metadata } from "next";
import FAQ from "@/components/hr/FAQ";
import PageHeader from "@/components/PageHeader";
import { StoreReviews } from "@/components/hr/Reviews";
import Articles from "@/components/hr/spletna-trgovina/Articles";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import FreeDeliveryTag from "@/components/hr/FreeDeliveryTag";

export const metadata: Metadata = {
  title: "Online trgovina",
};

function Page() {
  return (
    <>
      <PageHeader page="ONLINE TRGOVINA">
        Jedna krpica – tri pakiranja
      </PageHeader>
      <main>
        <Suspense fallback={<Spinner />}>
          <Articles />
        </Suspense>
        <StoreReviews />
        <FAQ />
      </main>
      <FreeDeliveryTag />
    </>
  );
}

export default Page;
