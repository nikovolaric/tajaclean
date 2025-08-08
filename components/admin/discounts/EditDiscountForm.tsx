"use client";

import Button from "@/components/Button";
import { getOneDiscount, updateDiscount } from "@/lib/discountActions";
import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function EditDiscountForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [discountData, setDiscountData] = useState<{
    name: string;
    value: number;
    _id: string;
    valid_until: string;
  } | null>(null);
  const [onCancel, setOnCancel] = useState(false);

  useEffect(
    function () {
      if (id) {
        setDiscountData(null);
        async function getDiscount() {
          try {
            const data = await getOneDiscount(id as string);

            if (data instanceof Error) {
              throw data;
            }

            setDiscountData(data);
            setOnCancel(!data.discount.valid_until);
          } catch (error) {
            console.log(error);
          }
        }

        getDiscount();
      }
    },
    [id],
  );

  async function handleAction(formData: FormData) {
    if (discountData) {
      await updateDiscount(formData, id!);
    }
  }

  if (id && discountData)
    return (
      <div className="flex flex-col gap-4">
        <p className="font-semibold">Uredi kodo za popust</p>
        <form
          className="relative grid grid-cols-3 gap-x-5 rounded-xl bg-white px-5 py-4 text-sm shadow-sm"
          action={handleAction}
        >
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
                defaultValue={discountData.name}
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
                defaultValue={(discountData.value * 100).toString()}
              />
            </div>
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
              defaultValue={
                discountData.valid_until
                  ? `${new Date(discountData.valid_until).toISOString().slice(0, 11)}${new Date(discountData.valid_until).toTimeString()}`.slice(
                      0,
                      16,
                    )
                  : ""
              }
            />
            <div>
              <input
                type="checkbox"
                name="onCancel"
                className="cursor-pointer"
                onChange={() => setOnCancel(onCancel ? false : true)}
                defaultChecked={onCancel}
              />{" "}
              <label>Velja do preklica</label>
            </div>
          </div>
          <Button variant="primary" className="justify-self-start">
            + Uredi kodo
          </Button>
          <Link className="absolute top-4 right-4" href="/admin/popusti">
            <X className="h-6 stroke-2" />
          </Link>
        </form>
      </div>
    );
}

export default EditDiscountForm;
