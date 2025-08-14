import HomeAnalytics from "@/components/admin/home/HomeAnalytics";
import MostSoldItems from "@/components/admin/home/MostSoldItems";
import { getIncomeByDiscounts } from "@/lib/discountActions";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Statistika",
};

async function Page() {
  const data = await getIncomeByDiscounts();

  return (
    <div className="flex flex-col gap-15">
      <Suspense>
        <HomeAnalytics />
      </Suspense>
      <div className="grid grid-cols-[5fr_4fr] gap-x-5 gap-y-15">
        <Suspense>
          <MostSoldItems />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
