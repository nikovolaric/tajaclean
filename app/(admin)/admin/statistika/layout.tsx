import StatsContextProvider from "@/components/admin/stats/StatsContextProvider";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <StatsContextProvider>{children}</StatsContextProvider>;
}

export default Layout;
