"use client"
import React from 'react'
import DashContainer from '../components/DashContainer'
import { useBackend } from '@/app/hooks/useBackend'
import { toast } from 'sonner'
import Button from '@/app/ui/Button'

export default function page() {


    

    return (
        <DashContainer header="Pagos y facturas" title="Mis pagos" subtitle="Aqui puedes ver y gestionar tus pagos y facturas.">
            <div className="max-w-[600px]">
                <p>hola</p>
                <button onClick={() => {
                    toast.success("Este es un mensaje de exito")
                }}>Hola</button>

            </div>
        </DashContainer>
    )
}
