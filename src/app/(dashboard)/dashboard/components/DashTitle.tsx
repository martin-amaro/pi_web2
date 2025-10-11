import React from "react";

export const DashTitle = ({ title, children }: { title: string, children?: React.ReactNode}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      {children && <p className="text-gray-600 mt-2">{children}</p>}
    </div>
  );
};
