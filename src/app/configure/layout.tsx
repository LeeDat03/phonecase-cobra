import MaxWidthWrapper from "@/components/max-width-wrapper";
import Step from "@/components/step";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex flex-1 flex-col">
      <Step />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
