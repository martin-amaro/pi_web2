/* eslint-disable @next/next/no-img-element */
import React from 'react'
import RegisterForm from './components/RegisterForm'
import { APP_NAME } from '@/app/config'

export default function page() {
    return (
        <div className="w-full flex">
            <div className='w-full lg:w-[50%] max-w-[1680px] h-full md:h-screen flex flex-col items-center '>

                <div className='w-10/12 2xl:w-6/12 py-16 mt-38 lg:mt-16'>
                   
                    <div className='text-left mb-8'>
                        <h1 className='text-4xl font-bold font-display text-neutral-900 mb-2'>Vamos a crear tu cuenta</h1>
                                <p className='text-neutral-800'>Registrarse en {APP_NAME} es rápido y gratis, sin compromisos ni contratos a largo plazo.</p>

                    </div>

                    <div className="w-full">
                        <RegisterForm />
                    </div>
                </div>

                
            </div>
            <div className="flex-1 hidden lg:flex w-1/2">
                        <img className='w-full m-auto h-full object-cover' src="https://cdn.prod.website-files.com/634f8a681508d6180f9a2128/659cddd0f20a20859890e10b_7%20Proven%20Techniques%20for%20Sucessfull%20Inventory%20Management.webp" alt="" />
                    </div>

        </div>
    )
}
