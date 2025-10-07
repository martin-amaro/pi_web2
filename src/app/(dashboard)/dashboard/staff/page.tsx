import React from "react";
import DashContainer from "../components/DashContainer";

export default function page() {
  return (
    <DashContainer
      header="Cuenta"
      title="Empleados"
      subtitle="Gestiona los empleados que pueden acceder a tu negocio."
    >
      <div className="max-w-[600px]"></div>
    </DashContainer>
  );
}
