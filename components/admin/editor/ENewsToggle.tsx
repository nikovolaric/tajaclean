"use client";

import { changeVisibility } from "@/lib/eNewsActions";

function ENewsToggle({ visible }: { visible: boolean }) {
  async function handleClick(visible: boolean) {
    await changeVisibility(visible);
  }

  return (
    <div className="grid grid-cols-2 rounded-lg border border-black/50 text-sm font-semibold">
      <button
        className={`cursor-pointer px-12 py-2 text-center ${visible ? "text-primary/50" : "border-primary rounded-lg border"}`}
        onClick={() => handleClick(false)}
      >
        Skrito
      </button>
      <button
        className={`cursor-pointer px-12 py-2 text-center ${!visible ? "text-primary/50" : "border-primary rounded-lg border"}`}
        onClick={() => handleClick(true)}
      >
        Vidno
      </button>
    </div>
  );
}

export default ENewsToggle;
