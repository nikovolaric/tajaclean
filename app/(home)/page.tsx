import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Comunity from "@/components/home/Comunity";
import Header from "@/components/home/Header";
import Steps from "@/components/home/Steps";
import WhatAreMicroFibers from "@/components/home/WhatAreMicroFibers";
import WhyUs from "@/components/home/WhyUs";
import NewsLetter from "@/components/NewsLetter";
import { Reviews } from "@/components/Reviews";
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
