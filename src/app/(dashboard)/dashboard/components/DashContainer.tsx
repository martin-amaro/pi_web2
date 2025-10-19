import React from "react";
import { DashHeader } from "./DashHeader";
import { DashTitle } from "./DashTitle";

export default function DashContainer({
  header,
  title,
  subtitle,
  children,
}: {
  header?: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {header && <DashHeader title={header} />}
      <div className="p-6">
        <DashTitle title={title}>
          {subtitle}
        </DashTitle>

        { children }
      </div>
    </div>
  );
}
