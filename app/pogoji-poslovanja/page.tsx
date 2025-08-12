import PageHeader from "@/components/PageHeader";
import Text from "@/components/pogoji-poslovanja/Text";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pogoji poslovanja",
};

function Page() {
  return (
    <>
      <PageHeader />
      <main>
        <Text />
      </main>
    </>
  );
}

export default Page;
