import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing checkout id" }, { status: 400 });
  }

  const res = await fetch(`https://api.sumup.com/v0.1/checkouts/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.SUMUP_SECRET_KEY}`,
    },
  });

  const data = await res.json();
  console.log(data);

  return NextResponse.json(data);
}
