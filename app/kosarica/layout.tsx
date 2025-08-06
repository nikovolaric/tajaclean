import ContextProvider from "@/components/ContextProvider";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <ContextProvider>{children}</ContextProvider>;
}

export default Layout;
