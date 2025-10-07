import CartContextProvider from "@/components/kosarica/CartContextProvider";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}

export default Layout;
