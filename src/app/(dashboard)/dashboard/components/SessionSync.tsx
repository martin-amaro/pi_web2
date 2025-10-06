"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SessionSync() {
  const { data: session, update } = useSession();

  useEffect(() => {
    if (!session?.user?.accessToken) return;

    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/status`,
          {
            headers: {
              Authorization: `Bearer ${session.user.accessToken}`,
            },
          }
        );

        if (!res.ok) return;

        const data = await res.json();

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
      }
    })();
  }, [session?.user?.accessToken]);

  return null;
}
