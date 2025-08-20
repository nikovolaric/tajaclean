"use client";

import Button from "@/components/Button";
import { createDiscount } from "@/lib/discountActions";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

function AddDiscount() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className="self-center"
      >
        {isOpen ? "Zapri ustvaranje" : "+ Ustvari novo kodo za popust"}
      </Button>
      {isOpen && <AddDiscountForm setIsOpen={setIsOpen} />}
    </>
  );
}

function AddDiscountForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [onCancel, setOnCancel] = useState(false);

  async function handleAction(formData: FormData) {
    await createDiscount(formData);

    setIsOpen(false);
  }

  return (
    <div className="fixed top-0 left-0 h-dvh w-dvw bg-black/50">
      <div className="mx-auto mt-32 flex max-w-5xl flex-col gap-4">
        <form
          className="relative grid grid-cols-3 gap-x-5 rounded-xl bg-white px-5 py-4 text-sm shadow-sm"
          action={handleAction}
        >
          <p className="col-span-3 mb-6 font-semibold">
            Ustvari novo kodo za popust
          </p>
          <X
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 cursor-pointer"
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-black/75">
                Nosilec kode za popust
              </label>
              <input
                autoComplete="off"
                name="person_name"
                className="w-full rounded-md border border-black/25 px-4 py-1 text-sm shadow-sm"
                placeholder="Vnesite nosilca kode"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-black/75">
                Vrednost kode za popust (%)
              </label>
              <input
                type="number"
                autoComplete="off"
                name="value"
                className="w-full rounded-md border border-black/25 px-4 py-1 text-sm shadow-sm"
                placeholder="Vnesite vrednost kode (%)"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-black/75">
                Naziv kode za popust
              </label>
              <input
                autoComplete="off"
                name="name"
                className="w-full rounded-md border border-black/25 px-4 py-1 text-sm shadow-sm"
                placeholder="Vnesite naziv kode"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-black/75">
                Veljavnost kode za popust
              </label>
              <input
                type="datetime-local"
                name="validUntil"
                className="w-full cursor-pointer rounded-md border border-black/25 px-4 py-1 text-sm shadow-sm disabled:opacity-50"
                placeholder="Vnesite naziv kode"
                disabled={onCancel}
              />
              <div>
                <input
                  type="checkbox"
                  name="onCancel"
                  className="cursor-pointer"
                  onChange={() => setOnCancel(onCancel ? false : true)}
                />{" "}
                <label>Velja do preklica</label>
              </div>
            </div>
          </div>
          <Button variant="primary" className="justify-self-end">
            + Ustvari kodo
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddDiscount;
