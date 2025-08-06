import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Comunity from "@/components/home/Comunity";
import Header from "@/components/home/Header";
import Steps from "@/components/home/Steps";
import Variants from "@/components/home/Variants";
import WhatAreMicroFibers from "@/components/home/WhatAreMicroFibers";
import WhyUs from "@/components/home/WhyUs";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Variants />
        <Steps />
        <WhyUs />
        <WhatAreMicroFibers />
        <Reviews />
        <FAQ />
        <Contact />
        <Comunity />
      </main>
    </>
  );
}
