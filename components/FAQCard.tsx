"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

function FAQCard({ qa, i }: { qa: { q: string; a: string }; i: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="border-neutral1 cursor-pointer border-b pb-4"
      onClick={() => setIsOpen((isOpen) => !isOpen)}
    >
      <p className="flex w-full items-center gap-4 lg:text-lg">
        <span>{i.padStart(2, "0")}</span>
        {qa.q}
        <ChevronDown
          height={24}
          className={`text-neutral1/75 ml-auto ${isOpen ? "rotate-180" : ""}`}
        />
      </p>
      {isOpen && (
        <p className="mt-4 ml-8 text-sm font-light lg:mt-5 lg:text-base">
          {qa.a}
        </p>
      )}
    </div>
  );
}

export default FAQCard;
