"use client";

import React from "react";
import DashContainer from "../components/DashContainer";
import { Input } from "@/components/ui/input";
import UpdateEmail from "./components/UpdateEmail";
import UpdatePassword from "./components/UpdatePassword";
import DeleteAccount from "./components/DeleteAccount";
import { useSession } from 'next-auth/react';
import { isPro } from "@/app/utils/plans";

export default function page() {
  const { data: session, status, update } = useSession();

  return (
    <DashContainer
      header="Cuenta"
      title="Ajustes"
      subtitle="Aquí puedes configurar las opciones de tu panel de control."
    >
      <div className="max-w-[600px]">
        <UpdateEmail />

        {(session?.user as any).provider === null && (
          <UpdatePassword />
        )}
        
        <DeleteAccount />
       
      </div>
    </DashContainer>
  );
}
