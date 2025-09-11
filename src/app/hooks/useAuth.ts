"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 1. Valida primero contra tu API
      const validateRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!validateRes.ok) {
        const errorData = await validateRes.json().catch(() => ({}));

        switch (validateRes.status) {
          case 401:
            setError("Correo o contraseña incorrectos.");
            break;
          case 400:
            setError(errorData.message || "Datos inválidos.");
            break;
          case 500:
            setError("Error interno del servidor.");
            break;
          default:
            setError("Error de conexión con el servidor.");
        }
        return false;
      }

      // 2. Si la validación es exitosa, crea la sesión con NextAuth
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // ⚡ controlamos la redirección manualmente
      });

      if (res?.error) {
        setError("Error al crear la sesión.");
        return false;
      }

      setError(null);

      // 3. Redirige manualmente al dashboard
      router.push("/dashboard");

      return true;
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.message?.includes("fetch failed")) {
        setError("No hay conexión con el servidor.");
      } else {
        setError("Error inesperado. Intenta nuevamente.");
      }
      return false;
    }
  };

  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return { login, logout, error, setError };
}
