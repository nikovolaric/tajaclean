"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

function AniImage({ alt, className, ...rest }: ImageProps) {
  const myref = useRef(null);

  const [start, setStart] = useState(false);

  useEffect(function () {
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          setStart(true);
        }
      },
      {
        root: null,
        threshold: 0.5,
      },
    );

    if (myref.current) {
      observer.observe(myref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      {...rest}
      alt={alt ?? "Slika"}
      className={`${start ? "translate-y-0 opacity-100" : "translate-y-13 opacity-0"} transition-all duration-1000 ${className}`}
      ref={myref}
    />
  );
}

export default AniImage;
