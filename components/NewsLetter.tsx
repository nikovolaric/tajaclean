"use client";

import Link from "next/link";
import { H3 } from "./Text";
import { Input } from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import { subscribe } from "@/lib/newsletterActions";

function NewsLetter({ visible }: { visible: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");

  function handleClick() {
    setIsOpen(false);

    sessionStorage.setItem("news", "false");
  }

  useEffect(() => {
    const news = sessionStorage.getItem("news");

    if (!news && visible) {
      setIsOpen(true);
    }

    if (news) {
      setIsOpen(false);
    }
  }, [visible]);

  async function handleAction(formData: FormData) {
    const data = await subscribe(formData);

    if (data === "ok") {
      setMsg("Uspešno ste se prijavili na e-novičke!");

      setTimeout(() => {
        setIsOpen(false);
        sessionStorage.setItem("news", "false");
      }, 3000);
    }
  }

  if (!isOpen) return <></>;

  return (
    <div className="fixed top-0 left-0 z-[1000] grid h-dvh w-dvw place-items-center bg-black/60">
      <div className="relative mx-4 flex h-fit w-fit max-w-158 flex-col gap-6 bg-[#F6F4F2] p-8 sm:mx-auto">
        <p
          className="absolute top-4 right-4 cursor-pointer font-semibold text-black/30"
          onClick={handleClick}
        >
          X
        </p>
        <H3 className="text-xl sm:text-2xl">Prijavite se na e-novičke!</H3>
        <p>
          S prijavo na e-novičke se strinjam s{" "}
          <Link className="cursor-pointer underline" href="/pogoji-poslovanja">
            Splošnimi pogoji poslovanja.
          </Link>
        </p>
        <form className="flex flex-col gap-6" action={handleAction}>
          <Input
            placeholder="Elektronski naslov*"
            name="email"
            autoComplete="off"
          />
          {msg && <p>{msg}</p>}
          <Button variant="primary" className="flex justify-center sm:self-end">
            Prijavi se
          </Button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
