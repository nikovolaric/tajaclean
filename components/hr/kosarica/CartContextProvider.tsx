"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type BuyerType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  taxNo: string;
  address: string;
  city: string;
  postal: string;
  country: string;
};

type DeliveryType = {
  firstName: string;
  lastName: string;
  company: string;
  taxNo: string;
  address: string;
  city: string;
  postal: string;
  country: string;
};

type CartContextType = {
  buyer: BuyerType;
  setBuyer: (buyer: BuyerType) => void;
  delivery: DeliveryType;
  setDelivery: (delivery: DeliveryType) => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  subscribe: boolean;
  setSubscribe: (subscribe: boolean) => void;
  notes?: string;
  setNotes: (notes: string) => void;
  agrees: boolean;
  setAgrees: (aggres: boolean) => void;
};

const defaultBuyer: BuyerType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  taxNo: "",
  address: "",
  city: "",
  postal: "",
  country: "",
};

const defaultDelivery: DeliveryType = {
  firstName: "",
  lastName: "",
  company: "",
  taxNo: "",
  address: "",
  city: "",
  postal: "",
  country: "",
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCartContext must be used within a ContextProvider");
  return context;
}

function ContextProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [buyer, setBuyer] = useState<BuyerType>(defaultBuyer);
  const [delivery, setDelivery] = useState<DeliveryType>(defaultDelivery);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [subscribe, setSubscribe] = useState(true);
  const [notes, setNotes] = useState("");
  const [agrees, setAgrees] = useState(false);

  useEffect(function () {
    const buyerString = localStorage.getItem("buyer");
    const deliveryString = localStorage.getItem("delivery");

    if (buyerString && deliveryString) {
      setBuyer(JSON.parse(buyerString));
      setDelivery(JSON.parse(deliveryString));
      setPaymentMethod(JSON.parse(localStorage.getItem("paymentMethod")!));
      setSubscribe(JSON.parse(localStorage.getItem("subscribe")!));
      setNotes(JSON.parse(localStorage.getItem("notes")!));
      setAgrees(JSON.parse(localStorage.getItem("agrees")!));
    }
  }, []);

  useEffect(
    function () {
      localStorage.setItem("buyer", JSON.stringify(buyer));
      localStorage.setItem("delivery", JSON.stringify(delivery));
      localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod));
      localStorage.setItem("subscribe", JSON.stringify(subscribe));
      localStorage.setItem("notes", JSON.stringify(notes));
      localStorage.setItem("agrees", JSON.stringify(agrees));
    },
    [buyer, delivery, paymentMethod, subscribe, notes, agrees],
  );

  useEffect(
    function () {
      const buyerString = localStorage.getItem("buyer");
      const deliveryString = localStorage.getItem("delivery");

      if (
        pathname === "/kosarica/zakljucek-nakupa/placilo" &&
        (!buyerString || !deliveryString)
      ) {
        router.push("/kosarica/zakljucek-nakupa");
      }
    },
    [pathname, buyer, delivery, router],
  );

  return (
    <CartContext.Provider
      value={{
        buyer,
        setBuyer,
        delivery,
        setDelivery,
        paymentMethod,
        setPaymentMethod,
        subscribe,
        setSubscribe,
        notes,
        setNotes,
        agrees,
        setAgrees,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default ContextProvider;
