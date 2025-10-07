"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useBackend } from "../hooks/useBackend";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const { data: session, update } = useSession();
  const { request } = useBackend();
  const [valid, setValid] = useState<boolean | null>(null);
  const updatedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || !session?.user?.accessToken) {
      setValid(false);
      return;
    }

    const verifyStripeSession = async () => {
      try {
        // 1️⃣ Verificar que la sesión de Stripe sea válida
        const res = await request(
          `/subscriptions/verify-session?session_id=${sessionId}`
        );

        if (!res?.verified) {
          setValid(false);
          return;
        }

        setValid(true);

        // 2️⃣ Evitar múltiples updates
        if (updatedRef.current) return;
        updatedRef.current = true;

        // 3️⃣ Obtener datos del backend
        const data = await request("/subscriptions/status", {
          method: "POST",
          token: session.user.accessToken,
        });

        // 4️⃣ Actualizar sesión con un pequeño delay para evitar re-render inmediato
        setTimeout(async () => {
          await update({
            user: {
              ...session.user,
              planName: data.planName,
              subscriptionStatus: data.status,
            },
          });
          console.log("✅ Sesión actualizada después del pago");
        }, 2900);

        // 5️⃣ Redirigir después de unos segundos
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      } catch (err: any) {
        console.error("Error verificando sesión:", err);
        setValid(false);
      }
    };

    verifyStripeSession();
  }, [sessionId, session?.user?.accessToken, router, request, update]);

  // UI
  if (valid === null)
    return <p className="text-center mt-10">Verificando pago...</p>;
  if (valid === false)
    return (
      <p className="text-center mt-10 text-red-500">Acceso no autorizado.</p>
    );

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold">Pago completado con éxito 🎉</h1>
      <p>Estamos actualizando tu plan...</p>
      <p className="mt-3 text-gray-500">Serás redirigido en unos segundos...</p>
    </div>
  );
}
