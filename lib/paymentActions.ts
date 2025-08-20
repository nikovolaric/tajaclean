"use server";

import { randomUUID } from "crypto";

export async function createSession({ amount }: { amount: number }) {
  try {
    const res = await fetch("https://api.sumup.com/v0.1/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUMUP_SECRET_KEY as string}`,
      },
      body: JSON.stringify({
        checkout_reference: randomUUID(),
        amount,
        currency: "EUR",
        merchant_code: process.env.MERCHANT_CODE,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Nekaj je šlo narobe");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function payWithCard({
  id,
  card,
}: {
  id: string;
  card: { name: string; number: string; date: string; cvv: string };
}) {
  try {
    const { name, number, date, cvv } = card;

    const [expiry_month, expiry_year] = date.split("/");

    const res = await fetch(`https://api.sumup.com/v0.1/checkouts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUMUP_SECRET_KEY as string}`,
      },
      body: JSON.stringify({
        payment_type: "card",
        card: {
          name,
          number: number.replaceAll(" ", ""),
          expiry_month,
          expiry_year,
          cvv,
        },
      }),
    });

    const data = await res.json();

    console.log(data);

    if (!res.ok) {
      throw new Error(data.message);
    }

    if (data.next_step) {
      return data.next_step;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
