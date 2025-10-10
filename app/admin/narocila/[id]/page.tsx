import type { Metadata } from "next";
import LinkBtn from "@/components/LinkBtn";
import { createClient } from "@/lib/supabase/server";
import BasicInfo from "@/components/admin/editOrder/BasicInfo";
import OrderInfo from "@/components/admin/editOrder/OrderInfo";
import PaymentType from "@/components/admin/editOrder/PaymentType";
import BuyerInfo from "@/components/admin/editOrder/BuyerInfo";
import OrderStatus from "@/components/admin/editOrder/OrderStatus";
import DeliveryInfo from "@/components/admin/editOrder/DeliveryInfo";
import Subscribe from "@/components/admin/editOrder/Subscribe";
import { Suspense } from "react";
import Tracking from "@/components/admin/editOrder/Tracking";
import MyNotes from "@/components/admin/editOrder/MyNotes";

export const metadata: Metadata = {
  title: "Uredi naročilo",
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from(process.env.NODE_ENV === "development" ? "test_orders" : "orders")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    <></>;
  }

  return (
    <div className="flex flex-col gap-15">
      <div>
        <LinkBtn variant="secondary" href="/admin/narocila">
          Nazaj na seznam
        </LinkBtn>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-dark">
          <span className="font-semibold">ID Naročila:</span> {data.id}
        </p>
        {/* <p className="text-sm">
          Status{" "}
          <span className="rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-center text-xs font-medium shadow-sm">
            {data.status}
          </span>
        </p> */}
        <Suspense>
          <OrderStatus status={data.status} id={data.id} />
        </Suspense>
      </div>
      <BasicInfo order={data} />
      <OrderInfo
        cart={data.cart}
        code={data.code}
        code_value={data.code_value}
        totalPrice={data.total_price}
      />
      <BuyerInfo buyer={data.buyer} />
      {data.buyer.address !== data.delivery.address && (
        <DeliveryInfo recepient={data.delivery} />
      )}
      {data.delivery.country === "Slovenija" && (
        <Tracking
          tracking_no={data.tracking_no}
          posta_guid={data.posta_guid}
          id={data.id}
          buyer={data.buyer}
          delivery={data.delivery}
          total_price={data.total_price}
          payment_method={data.payment_method}
        />
      )}
      <PaymentType
        paymentMethod={data.payment_method}
        notes={data.notes}
        paid={data.paid}
        id={data.id}
        sumupId={data.sumup_id}
      />
      <Subscribe subscribe={data.subscribe} />
      <MyNotes id={data.id} my_notes={data.my_notes} />
    </div>
  );
}

export default Page;
