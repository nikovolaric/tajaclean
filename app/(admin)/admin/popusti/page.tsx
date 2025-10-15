import AddDiscount from "@/components/admin/discounts/AddDiscount";
import DiscountList from "@/components/admin/discounts/DiscountList";
import EditDiscountForm from "@/components/admin/discounts/EditDiscountForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kode za popust",
};

function Page() {
  return (
    <div className="flex flex-col gap-20">
      <DiscountList />
      <AddDiscount />
      <EditDiscountForm />
    </div>
  );
}

export default Page;
