import HomeAnalytics from "@/components/admin/home/HomeAnalytics";
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
    </div>
  );
}

export default Page;
