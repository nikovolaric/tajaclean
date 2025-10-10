"use server";

export async function getAllSubscribers() {
  try {
    const params = new URLSearchParams();

    params.append("page", "1");

    const res = await fetch(
      `https://api.sender.net/v2/subscribers?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.SENDER_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      throw new Error("Nekaj je šlo narobe");
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
