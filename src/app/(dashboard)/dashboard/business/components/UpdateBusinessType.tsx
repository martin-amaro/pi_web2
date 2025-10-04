'use client'
import { ROLES } from '@/app/constants/roles';
import { BedDouble, BriefcaseBusiness, ChefHat, Dumbbell, Forklift, HardHat, Martini, Shirt } from 'lucide-react';
import React, { useState } from 'react'

const BusinessType = {
    1: ['Restaurante', <ChefHat size={20} />],
    2: ['Construcción', <HardHat size={20} />],
    3: ['Logística', <Forklift size={20} />],
    4: ['Hotelería', <BedDouble size={20} />],
    5: ['Bar / Licorería', <Martini size={20} />],
    6: ['Gimnasio', <Dumbbell size={20} />],
    7: ['Retail', <Shirt size={20} />],
    8: ['Otro', ""]
}


export const UpdateBusinessType = () => {

    const user = {};
    const [businessName, setBusinessName] = useState(user.business?.name || "");
    const [businessType, setBusinessType] = useState(user.business?.industry || "1");
    const [address, setAddress] = useState(user.business?.address || "");

    return (
        <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
            <div className="space-y-1">
                <label className="font-medium text-base text-slate-800 mb-1 block">Tipo de negocio</label>
                <div className='flex items-center gap-2'>
                    {BusinessType[businessType] ? BusinessType[businessType][1] : <BriefcaseBusiness size={24} />}
                    <span className="text-slate-500 font-medium text-sm py-2">{BusinessType[businessType]?.[0] ?? 'Desconocido'}</span>
                </div>
            </div>
            <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-4 flex">
                {/* {hasRole(user, ROLES.ADMIN) && (
                    <Dialog
                        title="Editar tipo de negocio"
                        onSave={() => {
                            setBusinessType(newBusinessType)
                            setHasChanges(true);
                        }}
                        onCancel={() => setNewBusinessType(businessType)}
                        triggerText='Cambiar'
                        triggerClass='btn-text'
                        canSave={businessType !== newBusinessType ? false : true}
                    >
                        <p className='text-tiny text-neutral-800 mb-4'>El tipo de negocio puede activar o desactivar algunas características. Escoge el que más se adapte a ti.</p>
                        <GuiSelect
                            placeholder={BusinessType[BusinessType][0] ?? 'Selecciona un tipo'}
                            value={BusinessType}
                            onChange={(e) => BusinessType(e)}
                        >
                            {Object.entries(BusinessType).map(([key, [label, icon]]) => (
                                <Option key={key} value={key}>
                                    {icon} {label}
                                </Option>
                            ))}
                        </GuiSelect>
                    </Dialog>
                )} */}
            </div>
        </div>
    )
}
