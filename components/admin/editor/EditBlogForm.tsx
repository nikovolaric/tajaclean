"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

function EditBlogForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isCoverImg, setIsCoverImg] = useState(true);
  const [coverImg, setCoverImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noticeData, setNoticeData] = useState<{
    notice: {
      title: string;
      text: string;
      _id: string;
      btn: string;
      btnLink: string;
      coverImg: string;
      visible: boolean;
    };
  } | null>(null);

  useEffect(
    function () {
      async function getOneNotice() {
        try {
          const res = await fetch(`/api/notices/${id}`);

          const data = await res.json();

          if (!res.ok) {
            throw data;
          }

          setNoticeData(data);
        } catch (error) {
          console.log(error);
        }
      }

      if (id) {
        getOneNotice();
      }
    },
    [id],
  );

  async function handleAction(formData: FormData) {
    if (noticeData) {
      // await editNotice(formData, noticeData.notice._id);
    }
  }

  function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const eFile = e.target.files?.[0];

    if (eFile) {
      setCoverImg(URL.createObjectURL(eFile));
    }
  }

  async function handleDeleteCoverImage(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);

      // await deleteNoticeImage(
      //   noticeData?.notice.coverImg,
      //   noticeData?.notice._id,
      // );

      setIsCoverImg(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (id)
    return (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Uredi novico</p>
        <form
          className="relative flex flex-col gap-4 rounded-xl bg-white px-5 py-4 text-sm shadow-sm"
          action={handleAction}
        >
          <Link href="/admin/urejevalnik">
            <X className="absolute top-4 right-6 h-5 stroke-2 text-black/25" />
          </Link>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black/75">
              Naslov novice
            </label>
            <input
              className="w-full rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
              placeholder="Dodaj naslov"
              name="title"
              autoComplete="off"
              defaultValue={noticeData?.notice.title}
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
              defaultValue={noticeData?.notice.text}
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
                defaultValue={noticeData?.notice.btn}
                autoComplete="off"
              />
            </div>
            <input
              className="w-full self-end rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
              placeholder="Dodaj povezavo gumba"
              name="btnLink"
              defaultValue={noticeData?.notice.btnLink}
              autoComplete="off"
            />
          </div>
          <div className="grid grid-cols-[4fr_5fr] gap-x-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-black/75">
                Dodaj naslovno sliko
              </label>
              <div className="flex h-full w-full flex-col justify-end gap-4 self-end rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm">
                {(coverImg || (noticeData?.notice.coverImg && isCoverImg)) && (
                  <Image
                    src={
                      coverImg ||
                      `https://fujter.s3.eu-central-1.amazonaws.com/${noticeData?.notice.coverImg}`
                    }
                    alt="naslovna slika"
                    width={300}
                    height={300}
                    className="w-auto object-cover"
                  />
                )}
                {noticeData?.notice.coverImg && isCoverImg ? (
                  <>
                    <input
                      hidden
                      defaultValue={noticeData.notice.coverImg}
                      name="curCoverImg"
                    />
                    <button
                      className="mx-auto w-fit cursor-pointer rounded-md bg-red-500 px-8 py-1 text-xs text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                      onClick={handleDeleteCoverImage}
                      disabled={isLoading}
                    >
                      {isLoading ? "Brišem" : "Izbriši naslovno fotografijo"}
                    </button>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
      {pending ? "..." : "Uredi novico"}
    </button>
  );
}

export default EditBlogForm;
