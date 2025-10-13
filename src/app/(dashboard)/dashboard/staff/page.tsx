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
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();


  try {
    const users = await backendRequest("/business/staff", {
      method: "GET",
      token: session?.user?.accessToken,
    });
  } catch {
    const users = [];
  }

  const query = (await searchParams)?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
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
            {/* <CreateInvoice /> */}
          </div>
          <Suspense key={query + currentPage} fallback={<StaffListSkeleton />}>
            <Table query={query} currentPage={currentPage} />
          </Suspense>

          {/* <UserTable>
            <Suspense fallback={<StaffListSkeleton />}>
              <StaffListLoader />
            </Suspense>
          </UserTable> */}
        </div>
      ) : (
        <PremiumFeature />
      )}
    </DashContainer>
  );
}
