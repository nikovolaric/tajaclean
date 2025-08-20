"use client";

import Button from "@/components/Button";
import { useCartContext } from "@/components/kosarica/CartContextProvider";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

function PaymentMethod() {
  const router = useRouter();
  const {
    paymentMethod,
    setPaymentMethod,
    subscribe,
    setSubscribe,
    buyer,
    delivery,
    notes,
    agrees,
    setAgrees,
  } = useCartContext();

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [cart, setCart] = useState([]);
  const [code, setCode] = useState("");
  const [codeValue, setCodeValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [id, setId] = useState("");
  const [card, setCard] = useState({
    name: "",
    number: "",
    date: "",
    cvv: "",
  });

  function updateCart() {
    const cartString = localStorage.getItem("cart");
    const codeString = localStorage.getItem("discount");
    if (cartString) {
      setCart(JSON.parse(cartString));

      const cartAmount = JSON.parse(cartString).reduce(
        (c: number, a: { price: number; discountPrice?: number }) =>
          c + (a.discountPrice ? a.discountPrice : a.price),
        0,
      );

      setAmount(cartAmount);
    } else {
      setCart([]);
    }

    if (codeString) {
      const discount = JSON.parse(codeString);
      setCode(discount.name);
      setCodeValue(discount.value);
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

  function generateTotal() {
    if (amount < 40) {
      return amount + 3.2;
    } else {
      return amount;
    }
  }

  async function handleClickCard() {
    handleClick("card");

    if (!id) {
      const data = await createSession({
        amount: parseFloat(generateTotal().toFixed(2)),
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

        if (result.url && result.payload?.creq) {
          const threeDSWin = window.open(
            "",
            "threeDSWindow",
            "width=500,height=700",
          );

          // pošlji creq v popup
          const form = document.createElement("form");
          form.method = "POST";
          form.action = result.url;
          form.target = "threeDSWindow";

          const creqInput = document.createElement("input");
          creqInput.type = "hidden";
          creqInput.name = "creq";
          creqInput.value = result.payload.creq;
          form.appendChild(creqInput);

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);

          // začni polling
          const interval = setInterval(async () => {
            const res = await fetch(`/api/checkPaymentStatus?id=${id}`);
            const data = await res.json();

            if (data.status && data.status !== "PENDING") {
              clearInterval(interval);
              threeDSWin?.close();

              if (data.status === "PAID") {
                await createOrder({
                  buyer,
                  delivery,
                  paymentMethod,
                  cart,
                  subscribe,
                  code,
                  notes,
                  code_value: codeValue,
                  paid: true,
                });

                router.push("/nakup-uspesen");
              } else {
                setErr("Plačilo ni uspelo. Poskusi znova.");
              }
            }
          }, 3000);

          return;
        }
      }

      await createOrder({
        buyer,
        delivery,
        paymentMethod,
        cart,
        subscribe,
        code,
        notes,
        code_value: codeValue,
        paid: paymentMethod === "card" ? true : false,
      });
    } catch (error) {
      setErr((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-10 xl:w-3/4">
      <H2>Način plačila</H2>
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
                    const raw = e.target.value.replace(/\s+/g, "");
                    const formatted = raw.match(/.{1,4}/g)?.join(" ") || "";
                    setCard({ ...card, number: formatted });
                    setCard({ ...card, number: formatted });
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
                    type="password"
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
                            value: generateTotal().toFixed(2),
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
                      code,
                      code_value: codeValue,
                      paid: true,
                    });
                  }}
                  onError={(err) => {
                    console.log(err);
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
                V primeru, da plačilo izvede druga oseba (drugo ime in priimek
                kot naročnik), prosimo, da to sporočite na email
                anja@tajaclean.si. Dovolj je, da navedete številko naročila in
                besedo &apos;plačano&apos;.
              </p>
            </div>
          )}
        </div>
        <div className="grid gap-6">
          <div className="flex items-center gap-6">
            <div
              className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
              onClick={() => handleClick("povzetje")}
            >
              <span
                className={`h-2 w-2 rounded-full ${paymentMethod === "povzetje" ? "bg-primary" : ""}`}
              />
            </div>
            <label className="font-semibold">Po povzetju.</label>
          </div>
          {paymentMethod === "povzetje" && (
            <div className="ml-6 flex gap-4">
              <div className="flex h-5 w-5 flex-none items-center justify-center rounded-full border bg-white text-sm font-bold">
                !
              </div>
              <p>
                Znesek naročila se poravna poštarju ob dostavi. Poštnina za
                plačilo po povzetju znaša 5,5 €.
                <br />
                <br />
                Hvala za zaupanje.
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
          sporočilih, na prej navedene osebne podatke.
        </label>
      </div>
      <div className="flex gap-6">
        <div
          className="border-primary flex h-3.5 w-3.5 flex-none cursor-pointer items-center justify-center rounded-full border bg-white select-none"
          onClick={() => setAgrees(!agrees)}
        >
          <span
            className={`h-2 w-2 rounded-full ${agrees ? "bg-primary" : ""}`}
          />
        </div>
        <label>
          Prebral/a sem in se strinjam s{" "}
          <Link href="/pogoji-poslovanja" target="_blank" className="underline">
            Splošnimi pogoji poslovanja.
          </Link>
        </label>
      </div>
      <Button
        variant="primary"
        className="flex w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSubmitOrder}
        disabled={
          isLoading || !paymentMethod || paymentMethod === "paypal" || !agrees
        }
      >
        {isLoading ? "..." : "Oddaj naročilo"}
      </Button>
    </div>
  );
}

export default PaymentMethod;
