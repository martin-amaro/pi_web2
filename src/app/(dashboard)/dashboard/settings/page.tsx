import React from "react";
import DashContainer from "../components/DashContainer";
import { Input } from "@/components/ui/input";
import UpdateEmail from "./components/UpdateEmail";

export default function page() {
  return (
    <DashContainer
      header="Cuenta"
      title="Ajustes"
      subtitle="Aquí puedes configurar las opciones de tu panel de control."
    >
        <div className="max-w-[600px]">
            <UpdateEmail />
        </div>
    </DashContainer>
  );
}
