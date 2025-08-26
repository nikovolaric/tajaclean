"use client";

import Button from "@/components/Button";
import { updateOrderTrackingNo } from "@/lib/orderActions";
import { useState } from "react";

function Tracking({ tracking_no, id }: { tracking_no?: string; id: number }) {
  const [isEdit, setIsEdit] = useState(false);

  async function handleAction(formData: FormData) {
    const tracking_no = formData.get("tracking_no") as string;

    await updateOrderTrackingNo({
      id,
      tracking_no: tracking_no !== "" ? tracking_no : null,
    });

    setIsEdit(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Sledilna številka</p>
      {!isEdit ? (
        <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
          <p className="text-sm font-semibold">
            {tracking_no ?? "Vnesi sledilno številko."}
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
          <input
            className="grow text-sm font-semibold outline-none"
            placeholder="Vnesi sledilno številko."
            name="tracking_no"
            autoComplete="off"
            defaultValue={tracking_no}
          />
          <Button variant="primary">Shrani</Button>
        </form>
      )}
    </div>
  );
}

export default Tracking;
