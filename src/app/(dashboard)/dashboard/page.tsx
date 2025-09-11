"use client";
import { auth } from "@/auth";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { UserAvatar } from "./UserAvatar";
import { DashHeader } from "./components/DashHeader";
import { DashTitle } from "./components/DashTitle";
import DashContainer from "./components/DashContainer";

export default function page() {
  // const { data: session, status } = useSession()

  // const session = await auth()
  // if (status === "loading") {
  //   return <div>Cargando...</div>
  // }

  // if (status === "unauthenticated") {
  //   return <div>No estás autenticado</div>
  // }

  return (
    <DashContainer
      header="Hello moto"
      title="Artículos y Servicios"
      subtitle="Gestiona tu inventario y catálogo de servicios de manera eficiente"
    >
      <p>hola</p>
    </DashContainer>
  );
}
