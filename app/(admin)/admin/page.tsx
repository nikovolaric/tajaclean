import ActiveDiscounts from "@/components/admin/home/ActiveDiscounts";
import HomeAnalytics from "@/components/admin/home/HomeAnalytics";
import MostSoldItems from "@/components/admin/home/MostSoldItems";
import NewOrders from "@/components/admin/home/NewOrders";
import WelcomeText from "@/components/admin/home/WelcomeText";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Oglasna deska",
};

function Page() {
  return (
    <div className="flex flex-col gap-15">
      <WelcomeText />
      <Suspense>
        <HomeAnalytics />
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <NewOrders />
      </Suspense>
      <div className="grid grid-cols-[4fr_5fr] gap-x-5 gap-y-15">
        <Suspense fallback={<p>Loading...</p>}>
          <ActiveDiscounts />
        </Suspense>
        <Suspense fallback={<p>Loading...</p>}>
          {/* <LastNotices /> */}
          <span />
        </Suspense>
        <MostSoldItems />
      </div>
    </div>
  );
}

export default Page;
