import LinkBtn from "@/components/LinkBtn";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plačilo",
};

function Page() {
  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-14 lg:gap-20">
        <LinkBtn href="/spletna-trgovina/zakljucek" variant="secondary">
          NAZAJ NA UREJANJE PODATKOV
        </LinkBtn>
      </div>
    </>
  );
}

export default Page;
