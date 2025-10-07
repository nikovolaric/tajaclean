"use client";

import Button from "@/components/Button";
import { useCartContext } from "@/components/kosarica/CartContextProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

function GoToPayment() {
  const router = useRouter();
  const { buyer } = useCartContext();
  const [err, setErr] = useState("");

  function handleClick() {
    setErr("");
    if (
      !buyer.firstName ||
      !buyer.lastName ||
      !buyer.email ||
      !buyer.phone ||
      !buyer.address ||
      !buyer.city ||
      !buyer.postal ||
      !buyer.country
    ) {
      setErr("Polja označena z * je obvezno potrebno izpolniti.");
    } else {
      router.push("/hr/kosarica/zakljucek-nakupa/placilo");
    }
  }

  return (
    <div className="flex flex-col gap-2 xl:order-9 xl:w-3/4">
      <Button
        variant="primary"
        className="flex justify-center"
        onClick={handleClick}
      >
        Prijeđi na plaćanje
      </Button>
      {err && <p className="text-alert font-medium">{err}</p>}
    </div>
  );
}

export default GoToPayment;
