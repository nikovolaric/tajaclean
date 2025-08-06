"use client";

import Button from "./Button";
import { Input, Textarea } from "./Input";

function ContactForm() {
  return (
    <form className="flex flex-col gap-4">
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
