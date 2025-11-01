'use client'

import Image from 'next/image';
import React, { useEffect, useRef } from 'react'

export default function Partners() {
    const marqueeRef = useRef<HTMLUListElement | null>(null);

    const partners = [
        'procinal.png',
        'cesde.png',
        'comfama.png',
        'tierragro.png',
        'uda.png',
        'platzi.png',
        'postobon.png',
    ];

    useEffect(() => {
        const root = document.documentElement;
        const marqueeContent = marqueeRef.current;

        if (!marqueeContent) return;

        const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");

        root.style.setProperty("--marquee-elements", marqueeContent.children.length.toString());

        for (let i = 0; i < Number(marqueeElementsDisplayed); i++) {
            marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        }
    }, []);

    return (
        <section className="bg-white w-full h-[200px] flex flex-col middle:flex-row justify-center items-center middle:gap-3">

            <div className='mt-5 middle:mt-0 text-center middle:text-left'>
                <h2 className="text-2xl max-w-sm px-2 font-medium font-a3 text-neutral-800">
                    Más de <span className='text-primary font-se'>10+</span> empresas que confían en nosotros
                </h2>
            </div>

            <div
                className="relative overflow-hidden text-[#eee]"
                style={{ width: 'var(--marquee-width)', height: 'var(--marquee-height)' }}
            >
                {/* Gradients (before/after) */}
                <div className="pointer-events-none absolute top-0 left-0 w-40 h-full z-10 bg-gradient-to-r from-white to-transparent" />
                <div className="pointer-events-none absolute top-0 right-0 w-40 h-full z-10 bg-gradient-to-l from-white to-transparent" />

                <ul
                    ref={marqueeRef}
                    className="list-none h-full flex animate-scrolling"
                    style={{ gap: 'var(--marquee-gap)' }}
                >
                    {partners.map((name, i) => (
                        <li
                            key={i}
                            className="flex justify-center items-center shrink-0 whitespace-nowrap"
                            style={{
                                width: 'var(--marquee-element-width)',
                                fontSize: 'calc(var(--marquee-height)*3/4)',
                                maxHeight: '100%',
                            }}
                        >
                            <img
                                src={`/images/partners/${name}`}
                                alt={name}
                                // width={200}
                                // height={100}
                                className="w-full h-full object-scale-down grayscale"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>

    )
}
