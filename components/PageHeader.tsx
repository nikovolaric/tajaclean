import { ReactNode } from "react";
import { H2 } from "./Text";

function PageHeader({
  children,
  page,
}: {
  children?: ReactNode;
  page?: string;
}) {
  return (
    <header className={children || page ? "pt-40 lg:pt-50" : "pt-20"}>
      {page && <p className="text-sm opacity-50 md:hidden">{page}</p>}
      {children && (
        <H2 className="md:text-center lg:text-[28px]">{children}</H2>
      )}
    </header>
  );
}

export default PageHeader;
