import type { Metadata } from "next";
import LinkBtn from "@/components/LinkBtn";
import { createClient } from "@/lib/supabase/server";
import BasicInfo from "@/components/admin/editOrder/BasicInfo";
import Delivery from "@/components/admin/editOrder/Delivery";
import OrderInfo from "@/components/admin/editOrder/OrderInfo";
import PaymentType from "@/components/admin/editOrder/PaymentType";
import BuyerInfo from "@/components/admin/editOrder/BuyerInfo";
import OrderStatus from "@/components/admin/editOrder/OrderStatus";
import DeliveryInfo from "@/components/admin/editOrder/DeliveryInfo";
import Subscribe from "@/components/admin/editOrder/Subscribe";

export const metadata: Metadata = {
  title: "Uredi naročilo",
};

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    <></>;
  }

  function generateDeliveryPrice() {
    const cartTotal = data.cart.reduce(
      (
        c: number,
        a: { price: number; discountPrice: number; quantity: number },
      ) => c + (a.discountPrice ?? a.price) * a.quantity,
      0,
    );

    if (cartTotal === data.total_price) {
      return 0;
    } else {
      return data.total_price - cartTotal;
    }
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
        <p className="text-sm">
          Status{" "}
          <span className="rounded-md border border-[rgba(0,0,0,0.25)] bg-white px-1.5 text-center text-xs font-medium shadow-sm">
            {data.status}
          </span>
        </p>
      </div>
      <BasicInfo order={data} />
      <Delivery deliveryPrice={generateDeliveryPrice()} />
      <OrderInfo
        cart={data.cart}
        code={data.code}
        code_value={data.code_value}
        totalPrice={data.total_price}
      />
      <PaymentType paymentMethod={data.payment_method} notes={data.notes} />
      <BuyerInfo buyer={data.buyer} />
      {data.buyer.address === data.delivery.address && (
        <DeliveryInfo recepient={data.delivery} />
      )}
      <Subscribe subscribe={data.subscribe} />
      <OrderStatus status={data.status} id={data.id} />
    </div>
  );
}

export default Page;
