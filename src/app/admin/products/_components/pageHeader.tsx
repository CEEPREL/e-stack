import React, { ReactNode } from "react";

function PageHeader({ children }: { children: ReactNode }) {
  return <div className="text-4xl mb-4 items-center">{children}</div>;
}

export default PageHeader;
