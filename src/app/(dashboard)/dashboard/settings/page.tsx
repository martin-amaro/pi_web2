"use client";

import React from "react";
import DashContainer from "../components/DashContainer";
import { Input } from "@/components/ui/input";
import UpdateEmail from "./components/UpdateEmail";
import UpdatePassword from "./components/UpdatePassword";
import DeleteAccount from "./components/DeleteAccount";

export default function page() {
  return (
    <DashContainer
      header="Cuenta"
      title="Ajustes"
      subtitle="Aquí puedes configurar las opciones de tu panel de control."
    >
        <div className="max-w-[600px]">
            <UpdateEmail />
            <UpdatePassword />
            <DeleteAccount />
        </div>
    </DashContainer>
  );
}
