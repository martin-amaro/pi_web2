"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'

export default function page() {

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const query = searchParams.get("query");


    return (
        <div className='text-3xl font-bold'>Buscando la palabra {query}...</div>
    )
}
