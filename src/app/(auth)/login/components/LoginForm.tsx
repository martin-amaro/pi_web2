'use client'

import React, { useState } from 'react'
import { AuthInput } from '../../components/AuthInput'
import { useRouter } from 'next/navigation';
import { validateForm } from '@/app/utils/auth';
import { AuthError } from '../../components/AuthError';
import Button from '@/app/ui/Button';
import { LoaderCircle } from 'lucide-react';
import { APP_NAME } from '@/app/config';
import useAuth from '@/app/hooks/useAuth';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
    const { login, error, setError, } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setErrors({});
        setError('');

        const formErrors = validateForm(email, password);
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            setLoading(false);
            return;
        }

        const success = await login(email, password);
        if (success) {
            router.push('/dashboard');
        }

        setLoading(false);
    }

    return (
        <>
            <form onSubmit={handleSubmit} method='POST'>
                <div className="space-y-6">
                    <AuthInput
                        label="Correo electrónico"
                        name="email"
                        type="text"
                        action={(e) => setEmail(e.target.value)}
                        disabled={false}
                        placeholder="Enter email"
                        error={errors.email}
                        value={email}
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

                </div>

                {error && <AuthError message={error} />}

                <div className="mt-12">
                    <Button
                        className='w-full my-0 flex justify-center transition-all'
                        disabled={loading}
                        buttonType="submit"
                    >
                        {loading ? <LoaderCircle className='animate-spin' /> : "Continuar"}
                    </Button>





                </div>
                
            </form>
            <div>
                <div className="flex justify-center gap-12 items-center my-5">
                    <span className='w-full border-t h-[1px] border-[#f3f3f3]'></span>
                    <span>O</span>
                    <span className='w-full border-t h-[1px] border-[#f3f3f3]'></span>


                </div>
                <Button
                    className='w-full my-0 gap-4 flex items-center justify-center transition-all'
                    type='secondary'
                    disabled={loading}
                    buttonType="submit"
                    onClick={() => signIn("google")}
                >
                    <img
                        className="size-6"
                        src="/images/google.svg"
                        alt="Google Logo"
                    />
                    Continuar con Google
                </Button>

                <p className="text-slate-800 text-base mt-6 text-center">
                    ¿Nuevo en {APP_NAME}?
                    <Button type='text' href="/register">Regístrate</Button>
                </p>

                
            </div>
        </>
    )
}
