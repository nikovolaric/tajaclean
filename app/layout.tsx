import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import CartFixed from "@/components/CartFixed";
import CookieConsent from "@/components/CookieConsent";
import { cookies } from "next/headers";
import GoogleAnalytics from "./GoogleAnalytics";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TajaClean",
    default: "Dobrodošli | TajaClean",
  },
  description:
    "TajaClean mikrofiber krpice za učinkovito, okolju prijazno in trajnostno čiščenje brez kemikalij.",
  keywords: [
    "tajaclean",
    "čudežna krpa",
    "krpa za čiščenje brez kemikalij",
    "mikrokrpa",
    "krpa iz mikrovlaken",
    "okolju prijazno čiščenje",
    "eko čiščenje",
    "krpa za čiščenje stekla",
    "krpa za čiščenje kuhinje",
    "krpa za čiščenje kopalnice",
  ],
  authors: [{ name: "LAMA Strategies", url: "https://www.lamastrategies.com" }],
  openGraph: {
    title: "TajaClean.si",
    description:
      "TajaClean mikrofiber krpice za učinkovito, okolju prijazno in trajnostno čiščenje brez kemikalij.",
    images: [
      {
        url: "https://www.tajaclean.si/homeBg.jpg",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "TajaClean.si",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const gaCookie = cookieStore.get("analytics_consent")?.value;

  return (
    <html
      lang="sl"
      className={`${lora.variable} ${montserrat.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <GoogleAnalytics />
      <body className="font-montserrat text-neutral1 mx-4 max-w-[1440px] md:mx-8 lg:mx-20 xl:mx-auto xl:px-20">
        <NavMenu />
        {children}
        <CartFixed />
        <Footer />
        {!gaCookie && <CookieConsent />}
      </body>
    </html>
  );
}
