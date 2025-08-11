"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavMenu({ newOrders }: { newOrders?: number }) {
  const pathname = usePathname();

  return (
    <nav className="text-nav flex flex-col gap-8 rounded-xl bg-white px-4 py-6 font-medium">
      <Image
        src="/logo.avif"
        alt="logo"
        width={100}
        height={60}
        className="object-contain"
      />
      <ul className="flex flex-col gap-2.5">
        <li
          className={`bg-bg rounded-md ${pathname === "/admin" ? "inset-shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          <Link href="/admin" className="flex items-center gap-2 px-3 py-2">
            <Image
              src="/icons/dashboard.svg"
              alt="oglasna deska"
              height={20}
              width={20}
              className="object-contain"
            />
            Oglasna deska
          </Link>
        </li>{" "}
        {/* <li
          className={`bg-bg rounded-md ${pathname.startsWith("/admin/artikli") ? "inset-shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          <Link
            href="/admin/artikli"
            className="flex items-center gap-2 px-3 py-2"
          >
            <Image
              src="/icons/articles.svg"
              alt="Artikli"
              height={20}
              width={20}
              className="object-contain"
            />
            Artikli
          </Link>
        </li>{" "} */}
        <li
          className={`bg-bg rounded-md ${pathname.startsWith("/admin/narocila") ? "inset-shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          <Link
            href="/admin/narocila"
            className="flex items-center gap-2 px-3 py-2"
          >
            <Image
              src="/icons/orders.svg"
              alt="Artikli"
              height={20}
              width={20}
              className="object-contain"
            />
            Naročila{" "}
            {newOrders && newOrders > 0 && (
              <div className="ml-8 flex h-6 w-6 items-center justify-center rounded-full border border-[0.5px_0.5px_4px_rgba(0,0,0,0.25)]">
                <span className="text-xs leading-3 font-medium text-red-500">
                  {newOrders}
                </span>
              </div>
            )}
          </Link>
        </li>{" "}
        {/* <li
          className={`bg-bg rounded-md ${pathname.startsWith("/admin/stats") ? "inset-shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          <Link
            href="/admin/stats"
            className="flex items-center gap-2 px-3 py-2"
          >
            <Image
              src="/icons/stats.svg"
              alt="Artikli"
              height={20}
              width={20}
              className="object-contain"
            />
            Statistika
          </Link>
        </li>{" "} */}
        <li
          className={`bg-bg rounded-md ${pathname.startsWith("/admin/popusti") ? "inset-shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          <Link
            href="/admin/popusti"
            className="flex items-center gap-2 px-3 py-2"
          >
            <Image
              src="/icons/discount.svg"
              alt="Artikli"
              height={20}
              width={20}
              className="object-contain"
            />
            Kode za popust
          </Link>
        </li>{" "}
        {/* <li
          className={`bg-bg rounded-md ${pathname.startsWith("/admin/urejevalnik") ? "inset-shadow-[0.5px_0.5px_4px_rgba(0,0,0,0.25)]" : ""}`}
        >
          <Link
            href="/admin/urejevalnik"
            className="flex items-center gap-2 px-3 py-2"
          >
            <Image
              src="/icons/editor.svg"
              alt="Artikli"
              height={20}
              width={20}
              className="object-contain"
            />
            Urejevalnik
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default NavMenu;
