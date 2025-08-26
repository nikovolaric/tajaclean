"use client";

import Button from "@/components/Button";
import { updateOrderMyNotes } from "@/lib/orderActions";
import { useState } from "react";

function MyNotes({ my_notes, id }: { my_notes?: string; id: number }) {
  const [isEdit, setIsEdit] = useState(false);

  async function handleAction(formData: FormData) {
    const my_notes = formData.get("my_notes") as string;

    await updateOrderMyNotes({
      id,
      my_notes: my_notes !== "" ? my_notes : null,
    });

    setIsEdit(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Moje opombe</p>
      {!isEdit ? (
        <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-sm font-semibold">
            {my_notes ?? "Vnesi morebitne opombe."}
          </p>
          <Button variant="primary" onClick={() => setIsEdit(true)}>
            Uredi
          </Button>
        </div>
      ) : (
        <form
          className="flex items-center justify-between rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]"
          action={handleAction}
        >
          <textarea
            className="grow text-sm font-semibold outline-none"
            placeholder="Vnesi morebitne opombe."
            name="my_notes"
            autoComplete="off"
            defaultValue={my_notes}
          />
          <Button variant="primary">Shrani</Button>
        </form>
      )}
    </div>
  );
}

export default MyNotes;
