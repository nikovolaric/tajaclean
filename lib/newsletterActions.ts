"use server";

export async function subscribe(formData: FormData) {
  try {
    const email = formData.get("email") as string;

    const res = await fetch("https://api.sender.net/v2/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDER_API_KEY}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      throw new Error("Nekaj je šlo narobe!");
    }

    return "ok";
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}
