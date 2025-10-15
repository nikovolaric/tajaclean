import Contact from "@/components/hr/Contact";
import FAQ from "@/components/hr/FAQ";
import Comunity from "@/components/hr/home/Comunity";
import Header from "@/components/hr/home/Header";
import Steps from "@/components/hr/home/Steps";
import WhatAreMicroFibers from "@/components/hr/home/WhatAreMicroFibers";
import WhyUs from "@/components/hr/home/WhyUs";
import NewsLetter from "@/components/hr/NewsLetter";
import { Reviews } from "@/components/hr/Reviews";
import { getIfVisible } from "@/lib/eNewsActions";

export default async function Home() {
  const data = await getIfVisible();

  return (
    <>
      <Header />
      <main>
        <Steps />
        <WhyUs />
        <WhatAreMicroFibers />
        <Reviews />
        <FAQ />
        <Contact />
        <Comunity />
      </main>
      <NewsLetter visible={data.visible} />
    </>
  );
}
