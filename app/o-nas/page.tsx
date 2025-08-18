import { type Metadata } from "next";
import LinkBtn from "@/components/LinkBtn";
import Technology from "@/components/o-nas/Technology";
import WhoAreWe from "@/components/o-nas/WhoAreWe";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "O nas",
};

function Page() {
  return (
    <>
      <PageHeader page="O NAS">
        Večletna tradicija - brez kompromisov pri kakovosti.
      </PageHeader>
      <main>
        <WhoAreWe />
        <Technology />
        <LinkBtn
          href="/spletna-trgovina"
          variant="primary"
          className="self-center"
        >
          Izberi svoj paket krpic
        </LinkBtn>
      </main>
    </>
  );
}

export default Page;
