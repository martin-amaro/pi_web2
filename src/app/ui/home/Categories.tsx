'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Handshake } from 'lucide-react'
import { CategoryItem } from '@/app/libs/definitions';
import Button from '../Button'

gsap.registerPlugin(ScrollTrigger);


export default function Categories() {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const horizontalRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const ctx = gsap.context(() => {
            const totalWidth = horizontalRef.current ? horizontalRef.current.scrollWidth : 0;

            gsap.to(horizontalRef.current, {
                x: () => `-${totalWidth - window.innerWidth}px`,
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: 'top 100px',
                    end: () => `+=${totalWidth - window.innerWidth}px`,
                    scrub: true,
                    pin: false,
                    anticipatePin: 2,
                    invalidateOnRefresh: true,
                    onRefresh: (self) => {
                        if (window.innerWidth < 768) {
                            self.disable();
                        } else {
                            self.enable();
                        }
                    }
                }
            })
        }, wrapperRef);

        const onResize = () => {
            ScrollTrigger.refresh();
        }

        window.addEventListener('resize', onResize);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', onResize);
        }
    }, [])


    return (
        <section className='bg-black py-32'>

            <div ref={wrapperRef} className="relative overflow-hidden">

                <div className='flex flex-col items-center my-8 text-center'>
                    <Handshake className='w-12 h-12 mb-4 text-white' />
                    <h3 className="text-3xl text-white md:text-5xl mb-8 font-bold font-display">
                        Nos adaptamos a tu
                        <br />
                        <span className='text-primary'>negocio</span>.
                    </h3>
                    <p className='text-gray-300 mb-4 text-lg'>Para cada industria, una solución flexible.</p>
                </div>

                <div
                    ref={horizontalRef}
                    className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:flex 
                        md:flex-row 
                        w-full 
                        md:w-max 
                        h-auto 
                        md:h-full 
                        gap-6 
                        md:gap-4 
                        px-8
                    "
                >
                    {[
                        { title: "Construcción", src: "/images/features/6.jpg", href: "#" },
                        { title: "Belleza", src: "/images/features/2.jpg", href: "#" },
                        { title: "Retail", src: "/images/features/3.jpg", href: "#" },
                        { title: "Logística", src: "/images/features/5.jpg", href: "#" },
                        { title: "Restaurantes", src: "/images/features/4.jpg", href: "#" },
                        { title: "Construcción", src: "/images/features/6.jpg", href: "#", className: "hidden md:flex" },
                        { title: "Construcción", src: "/images/features/6.jpg", href: "#", className: "hidden md:flex" },
                    ].map((item, i) => (
                        <Item key={i} {...item} />
                    ))}
                </div>

            </div>
            <div className='flex justify-center mt-12 bg-black text-white text-center'>
                <Button href="#" className='btn-main'>Elige tu sector y empieza</Button>
            </div>
        </section>
    )
}

const Item = ({ title, src, href, className = "" }: CategoryItem) => (
    <a
        href={href}
        className={
            'w-full md:w-[400px] aspect-[4/3] md:aspect-auto h-auto md:h-[564px] flex flex-col relative rounded-lg md:rounded-none overflow-hidden group shrink-0 ' +
            className
        }
    >
        <img
            src={src}
            alt=""
            className='w-full h-full object-cover will-change-transform group-hover:scale-110 transition duration-300'
        />

        <div className='absolute inset-0 md:bg-gradient-to-b from-transparent to-black md:group-hover:opacity-0 transition duration-200 flex items-end justify-center p-4'>
            <h3 className='text-white text-center text-base md:text-2xl font-medium font-app bg-black/50 px-2 py-1 rounded md:bg-transparent md:p-0'>
                {title}
            </h3>
        </div>
    </a>
)