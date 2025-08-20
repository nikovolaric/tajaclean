"use client";
import { useEffect, useRef } from "react";

export default function ThreeDSChallenge({
  url,
  creq,
}: {
  url: string;
  creq: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  // Auto-submit forme v iframe, ko se komponenta naloži
  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <iframe
        name="threeDSIframe"
        width="400"
        height="600"
        title="3D Secure Challenge"
        className="rounded-xl border shadow"
      />
      <form
        ref={formRef}
        method="POST"
        action={url}
        target="threeDSIframe"
        style={{ display: "none" }}
      >
        <input type="hidden" name="creq" value={creq} />
      </form>
    </div>
  );
}
