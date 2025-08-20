"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function acceptCookies() {
  const cookieStore = await cookies();

  cookieStore.set("analytics_consent", "true", {
    expires: new Date().setFullYear(new Date().getFullYear() + 2),
  });

  revalidatePath("/");
}

export async function declineCookies() {
  const cookieStore = await cookies();

  cookieStore.set("analytics_consent", "false", {
    expires: new Date().setFullYear(new Date().getFullYear() + 2),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  cookieStore.set("_ga", "", {
    expires: Date.now() + 1000,
    domain: ".tajaclean.si",
  });

  revalidatePath("/");
}
