import NavMenu from "@/components/admin/NavMenu";
import { createClient } from "@/lib/supabase/server";
import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import ".././globals.css";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

async function Layout({ children }: { children: ReactNode }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const { data: orderData } = await supabase
    .from("orders")
    .select()
    .eq("status", "Nepregledano");

  return (
    <html>
      <body
        className={`${inter.className} mx-4 mb-20 grid max-w-[1440px] grid-cols-[1fr_3fr] gap-x-5 py-10 md:mx-8 lg:mx-20 xl:mx-auto xl:px-20`}
      >
        <NavMenu newOrders={orderData?.length} />
        {children}
      </body>
    </html>
  );
}

export default Layout;
