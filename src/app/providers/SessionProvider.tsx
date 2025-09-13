// app/providers.tsx
"use client";

import { LoaderCircle } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";

function SessionGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full min-h-screen flex items-center justify-center">
          <LoaderCircle className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SessionGate>{children}</SessionGate>
    </SessionProvider>
  );
}
