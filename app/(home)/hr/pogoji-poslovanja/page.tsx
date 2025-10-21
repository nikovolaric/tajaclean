import PageHeader from "@/components/PageHeader";
import CookieText from "@/components/hr/pogoji-poslovanja/CookieText";
import Text from "@/components/hr/pogoji-poslovanja/Text";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Pogoji poslovanja",
};

async function Page() {
  const cookieStore = await cookies();

  const gaCookie = cookieStore.get("analytics_consent")?.value;

  return (
    <>
      <PageHeader />
      <main>
        <Text />
        <CookieText accepted={gaCookie && gaCookie === "true" ? true : false} />
      </main>
    </>
  );
}

export default Page;
