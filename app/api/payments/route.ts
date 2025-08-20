import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, number, date, cvv, id } = await req.json();

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

    if (data.next_step.url) {
      return NextResponse.json({ status: "success", url: data.next_step.url });
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 },
    );
  }
}
