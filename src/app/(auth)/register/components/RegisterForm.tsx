"use client";

import React, { useState } from "react";
import { AuthInput } from "../../components/AuthInput";
import useAuth from "@/app/hooks/useAuth";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import Button from "@/app/ui/Button";
import { APP_NAME } from "@/app/config";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { validateForm } from "@/app/utils/auth";
import { AuthError } from "../../components/AuthError";
import { AuthInputError } from "../../components/AuthInputError";

export default function RegisterForm() {
  const { register, login, error, setError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string; terms?: string; }>(
    {}
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    console.log("ds")
    setErrors({});
    setError("");

    const formErrors = validateForm(email, password, name, terms);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} method="POST">
        <div className="space-y-6">
          <AuthInput
            label="Nombre y apellido"
            name="name"
            type="text"
            action={(e) => setName(e.target.value)}
            disabled={false}
            placeholder="Ingrese el nombre"
            value={name}
            error={errors.name}
          />

          <AuthInput
            label="Correo electrónico"
            name="email"
            type="email"
            action={(e) => setEmail(e.target.value)}
            disabled={false}
            placeholder="Ingrese el correo"
            value={email}
            error={errors.email}
          />

          <AuthInput
            label="Contraseña"
            name="password"
            type="password"
            action={(e) => setPassword(e.target.value)}
            disabled={false}
            placeholder="Enter password"
            error={errors.password}
            value={password}
          />

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-slate-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="text-slate-800 ml-3 block text-sm"
            >
              Acepto los{" "}
              <a
                href="#"
                className="text-blue-600 font-medium hover:underline ml-0.5"
              >
                Términos y Condiciones
              </a>
            </label>
          </div>
          <AuthInputError message={errors.terms} />
        </div>

        {error && <AuthError message={error} />}

        <div className="mt-12">
          <Button
            // type='submit'
            disabled={loading}
            className="btn-main w-full my-0! flex justify-center"
            buttonType="submit"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </div>
      </form>
      <div>
        <div className="flex justify-center gap-12 items-center my-5">
          <span className="w-full border-t h-[1px] border-[#f3f3f3]"></span>
          <span>O</span>
          <span className="w-full border-t h-[1px] border-[#f3f3f3]"></span>
        </div>
        <Button
          className="w-full my-0 gap-4 flex items-center justify-center transition-all"
          type="secondary"
          disabled={loading}
          buttonType="submit"
          onClick={() => signIn("google")}
        >
          <img className="size-6" src="/images/google.svg" alt="Google Logo" />
          Continuar con Google
        </Button>

        <p className="text-slate-800 text-base mt-6 text-center">
          ¿Ya tienes cuenta?
          <Link
            href="/login"
            className="text-blue-600 font-medium hover:underline ml-1"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </>
  );
}
