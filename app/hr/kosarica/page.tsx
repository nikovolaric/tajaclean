import Cart from "@/components/hr/kosarica/Cart";
import Discount from "@/components/hr/kosarica/Discount";
import TotalPrice from "@/components/hr/kosarica/TotalPrice";
import LinkBtn from "@/components/LinkBtn";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Košarica",
};

function Page() {
  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-6 lg:gap-10">
        <LinkBtn href="/hr/spletna-trgovina" variant="secondary">
          POVRATAK U INTERNETSKU TRGOVINU
        </LinkBtn>
        <Cart />
        <TotalPrice />
        <Discount />
      </div>
    </>
  );
}

export default Page;
