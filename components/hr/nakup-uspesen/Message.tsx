"use client";

import { useEffect } from "react";
import { H2 } from "@/components/Text";

function Message() {
  useEffect(function () {
    localStorage.clear();

    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  return (
    <div className="grid gap-10">
      <H2>Vaša narudžba je uspješno poslana!</H2>
      <p>
        Zahvaljujemo vam na ukazanom povjerenju i želimo vam ugodno korištenje
        naše čudotvorne krpe!
        <br />
        <br />
        Na vašu e-mail adresu primit ćete sažetak narudžbe i ostale potrebne
        informacije.
      </p>
    </div>
  );
}

export default Message;
