import Comunity from "@/components/home/Comunity";
import Message from "@/components/nakup-uspesen/Message";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nakup uspešen",
};

function Page() {
  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-14 lg:gap-20">
        <Message />
        <Comunity />
      </div>
    </>
  );
}

export default Page;
