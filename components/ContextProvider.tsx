"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
  const [buyer, setBuyer] = useState<BuyerType>(defaultBuyer);
  const [delivery, setDelivery] = useState<DeliveryType>(defaultDelivery);

  return (
    <CartContext.Provider value={{ buyer, setBuyer, delivery, setDelivery }}>
      {children}
    </CartContext.Provider>
  );
}

export default ContextProvider;
