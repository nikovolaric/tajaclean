import HomeAnalytics from "@/components/admin/home/HomeAnalytics";
import { MostSoldItemsDays } from "@/components/admin/home/MostSoldItems";
import ByDiscountCode from "@/components/admin/stats/ByDiscountCode";
import PeriodFilter from "@/components/admin/stats/PeriodFilter";
import SalesByPeriod from "@/components/admin/stats/SalesByPeriod";
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
      <div className="flex flex-col gap-2">
        <PeriodFilter />
        <Suspense>
          <SalesByPeriod />
        </Suspense>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-15">
        <Suspense>
          <MostSoldItemsDays />
          <ByDiscountCode />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
