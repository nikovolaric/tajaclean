"use client";

import { useState } from "react";
import Button from "./Button";
import { Input, Textarea } from "./Input";
import { sendMail } from "@/lib/contactActions";

function ContactForm() {
  const [msg, setMsg] = useState("");

  async function handleAction(formData: FormData) {
    try {
      const result = await sendMail(formData);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      setMsg("Vaše sporočilo je bilo uspešno poslano.");
    } catch (error) {
      console.log(error);
      setMsg((error as Error).message);
    }
  }

  return (
    <form className="flex flex-col gap-4" action={handleAction}>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-5">
        <Input
          placeholder="Ime in priimek*"
          required
          autoComplete="off"
          name="name"
        />
        <Input
          placeholder="Elektronski naslov*"
          required
          autoComplete="off"
          name="email"
        />
      </div>
      <Textarea placeholder="Sporočilo*" required name="message" />
      {msg && <p className="font-medium">{msg}</p>}
      <Button
        variant="primary"
        className="mt-4 self-end disabled:cursor-not-allowed"
      >
        Pošlji sporočilo
      </Button>
    </form>
  );
}

export default ContactForm;
