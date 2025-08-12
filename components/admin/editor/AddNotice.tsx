"use client";

import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useFormStatus } from "react-dom";

function AddNotice() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="grid grid-cols-[4fr_5fr] gap-x-5">
        <div />
        <button
          className="bg-dark cursor-pointer rounded-md py-2 text-center text-xs font-medium text-white"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? "Zapri obrazec" : "+  Dodaj novo novico"}
        </button>
      </div>
      {isOpen && <AddNoticeForm setIsOpen={setIsOpen} />}
    </>
  );
}

function AddNoticeForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [coverImg, setCoverImg] = useState("");

  function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const eFile = e.target.files?.[0];

    if (eFile) {
      setCoverImg(URL.createObjectURL(eFile));
    }
  }

  async function handleAction(formData: FormData) {
    try {
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Dodaj novo novico</p>
      <form
        className="flex flex-col gap-4 rounded-xl bg-white px-5 py-4 text-sm shadow-sm"
        action={handleAction}
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black/75">
            Naslov novice
          </label>
          <input
            className="w-full rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
            placeholder="Dodaj naslov"
            name="title"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black/75">
            Besedilo novice
          </label>
          <textarea
            className="h-64 w-full rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
            placeholder="Dodaj besedilo"
            name="text"
          />
        </div>
        <div className="grid grid-cols-[4fr_5fr] gap-x-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black/75">
              Dodaj gumb
            </label>
            <input
              className="w-full rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
              placeholder="Dodaj besedilo gumba"
              name="btn"
              autoComplete="off"
            />
          </div>
          <input
            className="w-full self-end rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
            placeholder="Dodaj povezavo gumba"
            name="btnLink"
            autoComplete="off"
          />
        </div>
        <div className="grid grid-cols-[4fr_5fr] gap-x-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black/75">
              Dodaj naslovno sliko
            </label>
            <div className="flex h-full w-full flex-col justify-end gap-4 self-end rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm">
              {coverImg && (
                <Image
                  src={coverImg}
                  alt="naslovna slika"
                  width={300}
                  height={300}
                  className="w-auto object-cover"
                />
              )}
              <input
                placeholder="Vnesite informacije o skladiščenju"
                name="coverImg"
                type="file"
                accept="image/*"
                hidden
                id="coverImgBtn"
                onChange={handleCoverChange}
              />
              <label
                htmlFor="coverImgBtn"
                className="bg-primary mx-auto cursor-pointer rounded-md px-8 py-1 text-xs text-white"
              >
                Naloži naslovno fotografijo
              </label>
            </div>
          </div>
          <div className="bg-secondary/50 flex h-fit w-fit items-center gap-1 self-center justify-self-center rounded-md px-3 py-1">
            <input type="checkbox" name="visible" defaultChecked />{" "}
            <label className="text-xs font-medium">
              Vidno v spletni trgovini
            </label>
          </div>
        </div>
        <Button />
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button className="cursor-pointer rounded-md bg-green-800 py-2 text-center text-xs font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-400">
      {pending ? "..." : "Objavi novico v spletno trgovino"}
    </button>
  );
}

export default AddNotice;
