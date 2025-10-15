import OrdersPage from "@/components/admin/orders/OrdersPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naročila",
};

function Page() {
  return (
    <>
      <OrdersPage />
    </>
  );
}

export default Page;
