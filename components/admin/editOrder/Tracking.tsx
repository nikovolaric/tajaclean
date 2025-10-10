"use client";

import Button from "@/components/Button";
import {
  downloadList,
  downloadStamp,
  generateTracking,
  updateOrderTrackingNo,
} from "@/lib/orderActions";
import { useState } from "react";

function Tracking({
  tracking_no,
  posta_guid,
  id,
  buyer,
  delivery,
  payment_method,
  total_price,
}: {
  tracking_no?: string;
  posta_guid?: string;
  id: number;
  buyer: { email: string; phone: string; firstName: string };
  delivery: {
    firstName: string;
    lastName: string;
    postal: string;
    city: string;
    address: string;
  };
  payment_method: string;
  total_price: number;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parcelType, setParcelType] = useState("");
  const [postaId, setPostaId] = useState("");

  async function handleAction(formData: FormData) {
    const tracking_no = formData.get("tracking_no") as string;

    await updateOrderTrackingNo({
      id,
      tracking_no: tracking_no !== "" ? tracking_no : null,
    });

    setIsEdit(false);
  }

  async function handleClick() {
    try {
      setIsLoading(true);

      if (!parcelType && !postaId) return;

      const data = await generateTracking({
        delivery,
        buyer,
        total_price,
        payment_method,
        id,
        parcelType,
        postaId,
      });
      if (data) {
        const link = document.createElement("a");
        link.href = `data:application/pdf;base64,${data}`;
        link.download = `${delivery.firstName}-${delivery.lastName}-nalepka.pdf`;
        link.click();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDownloadList() {
    try {
      setIsLoading(true);

      if (posta_guid) {
        const data = await downloadList({ Guid: posta_guid, postaId });

        if (data) {
          const link = document.createElement("a");
          link.href = `data:application/pdf;base64,${data}`;
          link.download = `Oddajni popis.pdf`;
          link.click();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDownloadStamp() {
    try {
      setIsLoading(true);

      if (posta_guid && tracking_no) {
        const data = await downloadStamp({
          Guid: posta_guid,
          Data: tracking_no,
          postaId,
        });

        if (data) {
          const link = document.createElement("a");
          link.href = `data:application/pdf;base64,${data}`;
          link.download = `${delivery.firstName}-${delivery.lastName}-nalepka.pdf`;
          link.click();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Sledilna številka</p>
      <div className="flex items-center gap-4">
        {!tracking_no && (
          <>
            <Button
              variant="primary"
              onClick={handleClick}
              disabled={isLoading || parcelType === "" || !postaId}
            >
              Generiraj
            </Button>
            <select
              className="cursor-pointer outline-none"
              onChange={(e) => setParcelType(e.target.value)}
            >
              <option value="">Izberi tip paketa</option>
              <option value="138">MojPaket Mini</option>
              <option value="133">MojPaket Midi</option>
              <option value="135">MojPaket Maxi</option>
              <option value="328">Blagovno pismo s sledenjem – notranji</option>
            </select>
          </>
        )}
        <select
          className="cursor-pointer truncate outline-none"
          onChange={(e) => setPostaId(e.target.value)}
        >
          <option value="">Izberi pošto</option>
          <option value="3250">3250 - Rogaška Slatina</option>
          <option value="3240">3240 - Šmarje pri Jelšah</option>
          <option value="3252">3252 - Rogatec</option>
          <option value="3241">3241 - Podplat</option>
        </select>
        {posta_guid && (
          <>
            <Button
              variant="primary"
              onClick={handleDownloadStamp}
              disabled={isLoading || !postaId}
            >
              Prenesi nalepko
            </Button>
            <Button
              variant="primary"
              onClick={handleDownloadList}
              disabled={isLoading || !postaId}
            >
              Prenesi oddajni popis
            </Button>
          </>
        )}
      </div>
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
