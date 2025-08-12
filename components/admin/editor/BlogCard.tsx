"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  CircleAlert,
  Pencil,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import LinkBtn from "@/components/LinkBtn";

function BlogCard({
  notice,
}: {
  notice: {
    title: string;
    updatedAt: string;
    visible: boolean;
    _id: string;
    text: string;
    btn: string;
    btnLink: string;
    coverImg: string;
  };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);

      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-red-500 bg-white px-5 py-4 text-sm shadow-sm">
        <p className="flex items-center gap-4 font-semibold">
          <CircleAlert className="w-4 flex-none stroke-2" />
          Novica je bila izbrisana.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[7fr_4fr_4fr_4fr] items-center gap-y-10 rounded-xl bg-white py-4 text-sm shadow-sm">
      <p className="px-5 font-semibold">{notice.title}</p>
      <p className="text-center text-sm">
        {new Date(notice.updatedAt).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p
        className={`justify-self-center rounded-md border px-1.5 text-center text-xs font-medium shadow-sm ${notice.visible ? "border-green-800" : "border-red-500"}`}
      >
        {notice.visible ? "Vidno" : "Skrito"}
      </p>
      <div className="flex items-center justify-center gap-5">
        <Link href={{ query: { id: notice._id } }}>
          <Pencil className="h-5 stroke-2" />
        </Link>
        {isLoading ? (
          <RefreshCcw className="h-5 animate-spin" />
        ) : (
          <Trash2
            className="h-5 cursor-pointer stroke-2"
            onClick={handleDelete}
          />
        )}
        <ChevronDownIcon
          className={`w-5 cursor-pointer stroke-2 ${isOpen ? "rotate-180" : ""}`}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        />
      </div>
      {isOpen && (
        <div className="col-span-4 flex flex-col gap-8 px-5">
          <p className="text-sm">
            {notice.text.split("\r\n").map((el, i) => (
              <Fragment key={(i + 1) * 10000}>
                {el}
                <br />
              </Fragment>
            ))}
          </p>
          <div className="flex items-start gap-10">
            <LinkBtn variant="primary" href={notice.btnLink} target="_blank">
              {notice.btn}
            </LinkBtn>
            <Image
              src={`https://fujter.s3.eu-central-1.amazonaws.com/${notice.coverImg}`}
              alt="naslovna slika"
              width={300}
              height={300}
              className="h-32 w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogCard;
