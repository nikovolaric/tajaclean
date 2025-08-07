"use client";

import Button from "@/components/Button";
import { useCartContext } from "@/components/ContextProvider";
import Amex from "@/components/icons/Amex";
import Maestro from "@/components/icons/Maestro";
import Master from "@/components/icons/Master";
import Paypal from "@/components/icons/Paypal";
import Visa from "@/components/icons/Visa";
import { Input } from "@/components/Input";
import { H2 } from "@/components/Text";
import { createOrder } from "@/lib/orderActions";
import { createSession, payWithCard } from "@/lib/paymentActions";
import { useEffect, useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function PaymentMethod() {
  const {
    paymentMethod,
    setPaymentMethod,
    subscribe,
    setSubscribe,
    buyer,
    delivery,
  } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [cart, setCart] = useState([]);
  const [id, setId] = useState("");
  const [card, setCard] = useState({
    name: "",
    number: "",
    date: "",
    cvv: "",
  });

  function updateCart() {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      setCart(JSON.parse(cartString));
    } else {
      setCart([]);
    }
  }

  useEffect(function () {
    updateCart();

    const handleCartUpdate = () => updateCart();

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  function handleClick(pm: string) {
    setPaymentMethod(pm);
  }

  async function handleClickCard() {
    handleClick("card");

    if (!id) {
      const amount = cart.reduce((c, a: { price: number }) => c + a.price, 3.2);

      const data = await createSession({
        amount: parseFloat(amount.toFixed(2)),
      });

      setId(data.id);
    }
  }

  async function handleSubmitOrder() {
    setIsLoading(true);
    try {
      if (!paymentMethod) {
        throw new Error("Izberi način plačila!");
      }

      if (paymentMethod === "card") {
        const result = await payWithCard({ id, card });

        if (result instanceof Error) {
          throw new Error(result.message);
        }
      }

      await createOrder({ buyer, delivery, paymentMethod, cart, subscribe });
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-10 xl:w-3/4">
      <H2>
        Način <span className="italic">plačila</span>
      </H2>
      <form className="bg-primary/5 grid gap-10 px-4 py-6 lg:px-6 lg:py-10">
        <div className="grid gap-6">
          <div className="flex items-center gap-6">
            <div
              className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
              onClick={handleClickCard}
            >
              <span
                className={`h-2 w-2 rounded-full ${paymentMethod === "card" ? "bg-primary" : ""}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Bančna kartica.</label>
              <Visa />
              <Amex />
              <Master />
              <Maestro />
            </div>
          </div>
          {paymentMethod === "card" && id && (
            <div className="grid gap-6 lg:mx-auto lg:w-5/6">
              <div>
                <label>Ime in priimek imetnika kartice</label>
                <Input
                  required
                  placeholder="Vnesite ime in priimek"
                  autoComplete="off"
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />
              </div>
              <div>
                <label>Številka kartice</label>
                <Input
                  required
                  placeholder="Vnesite številko kartice"
                  autoComplete="off"
                  maxLength={19}
                  minLength={18}
                  onChange={(e) => {
                    const formattedValue = e.target.value
                      .split("")
                      .fill(" ", 4, 5)
                      .fill(" ", 9, 10)
                      .fill(" ", 14, 15)
                      .join("");
                    setCard({ ...card, number: formattedValue });
                  }}
                  value={card.number}
                />
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                <div>
                  <label>Velja do</label>
                  <Input
                    required
                    placeholder="MM/LL"
                    autoComplete="off"
                    maxLength={5}
                    minLength={5}
                    onChange={(e) => {
                      let formattedValue = e.target.value;
                      if (e.target.value.length === 2) {
                        formattedValue = `${formattedValue}/`;
                      }

                      setCard({ ...card, date: formattedValue });
                    }}
                    value={card.date}
                  />
                </div>
                <div>
                  <label>CVV/CVC</label>
                  <Input
                    required
                    placeholder="CVV/CVC"
                    autoComplete="off"
                    maxLength={4}
                    minLength={3}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          {paymentMethod === "card" && !id && <p>...</p>}
        </div>
        <div className="grid gap-6">
          <div className="flex items-center gap-6">
            <div
              className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
              onClick={() => handleClick("paypal")}
            >
              <span
                className={`h-2 w-2 rounded-full ${paymentMethod === "paypal" ? "bg-primary" : ""}`}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Paypal.</label>
              <Paypal />
            </div>
          </div>
          {paymentMethod === "paypal" && (
            <div className="lg:mx-auto lg:w-1/2">
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENTID!,
                  currency: "EUR",
                  disableFunding: "card",
                }}
              >
                <PayPalButtons
                  createOrder={(_, actions) => {
                    return actions.order.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "EUR",
                            value: cart
                              .reduce(
                                (c, a: { price: number }) => c + a.price,
                                3.2,
                              )
                              .toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (_, actions) => {
                    await actions.order?.capture();

                    await createOrder({
                      buyer,
                      delivery,
                      paymentMethod,
                      cart,
                      subscribe,
                    });

                    // navigate(`${pathname}/success`);
                  }}
                  onCancel={() => {
                    console.log("error");
                    // navigate(pathname);
                  }}
                  onError={(err) => {
                    console.error("Napaka pri plačilu:", err);
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}
        </div>
        <div className="grid gap-6">
          <div className="flex items-center gap-6">
            <div
              className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
              onClick={() => handleClick("proforma")}
            >
              <span
                className={`h-2 w-2 rounded-full ${paymentMethod === "proforma" ? "bg-primary" : ""}`}
              />
            </div>
            <label className="font-semibold">Po predračunu.</label>
          </div>
          {paymentMethod === "proforma" && (
            <div className="ml-6 flex gap-4">
              <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full border bg-white text-sm font-bold">
                !
              </div>
              <p>
                Po oddaji naročila, boste prejeli potrditveni e-mail, v katerem
                bodo navedeni podatki za nakazilo.
                <br />
                <br />
                Da krpice čim prej krenejo na pot, vas prosimo, da na mail
                anja@tajaclean.com pošljete informacijo o izvedenem plačilu.
                Dovolj je le vaša številka naročila in beseda plačano.
                <br />
                <br />
                Hvala že vnaprej.
              </p>
            </div>
          )}
        </div>
      </form>
      {err && <p className="text-alert font-medium">{err}</p>}
      <div className="flex gap-6">
        <div
          className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
          onClick={() => setSubscribe(!subscribe)}
        >
          <span
            className={`h-2 w-2 rounded-full ${subscribe ? "bg-primary" : ""}`}
          />
        </div>
        <label>
          Strinjam se, da prejemam tržna sporočila po e-pošti ali SMS
          sporočilih, a prej navedene osebne podatke.
        </label>
      </div>
      <Button
        variant="primary"
        className="flex w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmitOrder}
        disabled={isLoading || !paymentMethod || paymentMethod === "paypal"}
      >
        {isLoading ? "..." : "Oddaj naročilo"}
      </Button>
    </div>
  );
}

export default PaymentMethod;
