import { type Metadata } from "next";
import LinkBtn from "@/components/LinkBtn";
import Technology from "@/components/hr/o-nas/Technology";
import WhoAreWe from "@/components/hr/o-nas/WhoAreWe";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "O nas",
};

function Page() {
  return (
    <>
      <PageHeader page="O NAMA">
        Dugogodišnja tradicija – bez kompromisa po pitanju kvalitete
      </PageHeader>
      <main>
        <WhoAreWe />
        <Technology />
        <LinkBtn
          href="/hr/spletna-trgovina"
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
