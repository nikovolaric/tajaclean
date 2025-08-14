import HomeAnalytics from "@/components/admin/home/HomeAnalytics";
import MostSoldItems from "@/components/admin/home/MostSoldItems";
import ByDiscountCode from "@/components/admin/stats/ByDiscountCode";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Statistika",
};

function Page() {
  return (
    <div className="flex flex-col gap-15">
      <Suspense>
        <HomeAnalytics />
      </Suspense>
      <div className="grid grid-cols-[5fr_4fr] gap-x-5 gap-y-15">
        <Suspense>
          <MostSoldItems />
          <ByDiscountCode />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
