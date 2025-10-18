import React, { Suspense } from "react";
import DashContainer from "../components/DashContainer";
import NewUser from "./components/NewUser";
import { auth } from "@/auth";

import { backendRequest } from "@/app/hooks/useBackendServer";
import { StaffListSkeleton } from "./components/StaffListSkeleton";
import { isPro } from "@/app/utils/plans";
import { PremiumFeature } from "../components/PremiumFeature";
import { SearchStaff } from "./components/SearchStaff";
import { Table } from "./components/Table";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await auth();

  let users = [];
  try {
    users = await backendRequest("/business/staff", {
      method: "GET",
      token: session?.user?.accessToken,
    });
  } catch {
    users = [];
  }

  // Await searchParams antes de usarlo
  const params = await searchParams;
  const query = params?.query || "";
  const currentPage = Number(params?.page) || 1;
  const totalPages = 1;

  return (
    <DashContainer
      header="Cuenta"
      title="Empleados"
      subtitle="Gestiona los empleados que pueden acceder a tu negocio."
    >
      {isPro(session?.user) ? (
        <div className="">
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <SearchStaff placeholder="Buscar empleados..." />
            <NewUser></NewUser>
          </div>
          <Suspense key={query + currentPage} fallback={<StaffListSkeleton />}>
            <Table query={query} currentPage={currentPage} />
          </Suspense>
        </div>
      ) : (
        <PremiumFeature />
      )}
    </DashContainer>
  );
}
