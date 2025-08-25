"use server";

import { sendEnquiry } from "@/config/mail";

export async function sendMail(formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    const res = await sendEnquiry(data);

    if (!res.includes("250")) {
      throw new Error("Nekaj je šlo narobe!");
    }

    return "ok";
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}
