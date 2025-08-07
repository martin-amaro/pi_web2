'use client'

import React, { useState } from 'react'
import { AuthInput } from '../ui/auth/AuthInput'
import Button from '../ui/Button';
import { APP_NAME } from '../config';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { AuthError } from '../ui/auth/AuthError';
import { LoaderCircle } from 'lucide-react';
import { validateForm } from '../utils/auth';

export default function page() {
    const { login, error, setError } = useAuth();
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
            router.push('/');
        }

        setLoading(false);
    }

    return (
        <div className='flex-grow flex items-center justify-center mx-auto w-full' >
            <div className='w-full lg:w-[50%] max-w-[1680px] h-full flex flex-col items-center justify-center'>

                <div className='w-10/12 2xl:w-6/12 py-16'>
                    <div className="flex text-center mb-8">
                        <img src="/stocker.svg" alt="logo" className="w-10 inline-block" />
                    </div>
                    <div className='text-left mb-8'>
                        <h1 className='text-4xl font-bold font-display text-neutral-900 mb-2'>Inicia sesión</h1>
                    </div>

                    <div className="w-full">


                        <form onSubmit={handleSubmit} >
                            <div className="space-y-6">
                                <AuthInput
                                    label="Correo electrónico"
                                    name="email"
                                    type="text"
                                    action={(e) => setEmail(e.target.value)}
                                    disabled={false}
                                    placeholder="Enter email"
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
                                />

                            </div>

                            {error && <AuthError message={error} />}

                            <div className="mt-12">
                                <Button
                                    className='w-full my-0 flex justify-center'
                                    disabled={loading}
                                    buttonType="submit"
                                >
                                    {loading ? <LoaderCircle className='animate-spin' /> : "Continuar"}
                                </Button>

                            </div>
                            <p className="text-slate-800 text-base mt-6 text-center">
                                ¿Nuevo en {APP_NAME}?
                                <Button type='text' href="#">Regístrate</Button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}
