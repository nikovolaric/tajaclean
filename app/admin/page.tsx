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
      <Suspense fallback={<p>Loading...</p>}>
        <NewOrders />
      </Suspense>
      <div className="grid grid-cols-[4fr_5fr] gap-x-5">
        <Suspense fallback={<p>Loading...</p>}>
          {/* <ActiveDiscounts /> */}
        </Suspense>
        <Suspense fallback={<p>Loading...</p>}>
          {/* <LastNotices /> */}
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
