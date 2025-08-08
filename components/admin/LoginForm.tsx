"use client";

import { useState } from "react";
import Button from "../Button";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const [err, setErr] = useState("");

  async function clientAction(formData: FormData) {
    const supabase = createClient();
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) throw error;
      router.push("/admin");
    } catch (error: unknown) {
      setErr(error instanceof Error ? error.message : "An error occurred");
    }
  }

  return (
    <form
      className="mx-auto flex h-dvh max-w-7xl flex-col gap-6 pt-20"
      action={clientAction}
    >
      <h2 className="text-primary text-2xl font-bold">Vpiši se!</h2>
      <div className="flex w-1/3 flex-col gap-1">
        <label>Email:</label>
        <input
          type="text"
          className="h-8 rounded-md bg-neutral-50 px-3"
          name="email"
          required
          autoComplete="off"
        />
      </div>
      <div className="flex w-1/3 flex-col gap-1">
        <label>Geslo:</label>
        <input
          type="password"
          className="h-8 rounded-md bg-neutral-50 px-3"
          name="password"
          required
          autoComplete="off"
        />
      </div>
      {err && <p className="font-bold text-red-400">{err}</p>}
      <Button variant="primary" className="self-start">
        Vpiši se
      </Button>
    </form>
  );
}

export default LoginForm;
