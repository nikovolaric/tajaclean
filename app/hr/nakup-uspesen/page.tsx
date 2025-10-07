import Comunity from "@/components/hr/home/Comunity";
import Message from "@/components/hr/nakup-uspesen/Message";
import { ScrollToTop } from "@/components/nakup-uspesen/ScrollToTop";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kupnja uspjela",
};

function Page() {
  return (
    <>
      <ScrollToTop />
      <PageHeader />
      <div className="mt-25 flex flex-col gap-14 lg:gap-20">
        <Message />
        <Comunity />
      </div>
    </>
  );
}

export default Page;
