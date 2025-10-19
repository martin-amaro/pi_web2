"use client";
import { useBackend } from "@/app/hooks/useBackend";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionSync() {
  const { data: session, update } = useSession();
  const { request } = useBackend();

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    (async () => {
      try {
        const data = await request("/subscriptions/status", { method: 'POST', token: session?.user?.accessToken});
        
        // Solo actualiza si algo cambió
        if (data.planStatus !== session.user.plan?.status) {
          await update({
            user: {
              ...session.user,
              planName: data.planName,
              subscriptionStatus: data.planStatus,
            },
          });
          console.log("Sesión actualizada con nuevo plan:", data);
        }
      } catch (err) {
        console.error("Error al verificar plan:", err);
        signOut();
      }
    })();
  }, [session?.user?.accessToken]);

  return null;
}
