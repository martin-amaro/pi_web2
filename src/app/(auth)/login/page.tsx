'use client'

import React, { useState } from 'react'
import useAuth from '../../hooks/[old]useAuth';
import { useRouter } from 'next/navigation';
import { validateForm } from '../../utils/auth';
import { signIn, signOut } from "next-auth/react"
import LoginForm from './components/LoginForm';


export default function page() {
    return (
        <div className='w-full lg:w-[50%] max-w-[1680px] h-full flex flex-col items-center'>

            <div className='w-10/12 2xl:w-6/12 py-16 mt-12 lg:mt-32'>
                <div className="flex text-center mb-8">
                    <img src="/stocker.svg" alt="logo" className="w-10 inline-block" />
                </div>
                <div className='text-left mb-8'>
                    <h1 className='text-4xl font-bold font-display text-neutral-900 mb-2'>Inicia sesión</h1>
                </div>

                <div className="w-full">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

