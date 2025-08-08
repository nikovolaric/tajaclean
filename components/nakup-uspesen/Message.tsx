"use client";

import { useEffect } from "react";
import { H2 } from "../Text";

function Message() {
  useEffect(function () {
    localStorage.clear();

    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  return (
    <div className="grid gap-10">
      <H2>
        Vaše naročilo je bilo <span className="italic">uspešno oddano!</span>
      </H2>
      <p>
        Zahvaljujemo se vam za vaše zaupanje in vam želimo prijetno uporabo naše
        čudežne krpice!
        <br />
        <br />
        Na vaš elektronski naslov boste prejeli povzetek naročila in ostale
        potrebne informacije.
      </p>
    </div>
  );
}

export default Message;
