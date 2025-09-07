'use client'

import React, { useEffect, useState } from 'react';
import { Badge } from '../Badge';
import clsx from 'clsx';

const questions = [
    {
        "pregunta": "¿Qué es el gestor de inventario?",
        "respuesta": "Es una solución integral para almacenar, gestionar y controlar inventarios de manera eficiente en diversos sectores como retail, hotelería, restaurantes, construcción y más. Facilita la administración de productos, stock, entradas y salidas en tiempo real."
    },
    {
        "pregunta": "¿Puedo cancelar mi suscripción en cualquier momento?",
        "respuesta": "Sí, tienes la libertad de cancelar tu suscripción en cualquier momento sin penalizaciones ni costos adicionales."
    },
    {
        "pregunta": "¿El software es compatible con dispositivos móviles y tablets?",
        "respuesta": "Sí, nuestra plataforma está diseñada para funcionar perfectamente en dispositivos móviles y tablets, permitiéndote gestionar tu inventario desde cualquier lugar."
    },
    {
        "pregunta": "¿Puedo exportar mis datos a Excel o CSV?",
        "respuesta": "Por supuesto, puedes exportar toda la información de tu inventario en formatos Excel y CSV para realizar análisis, respaldos o integraciones con otros sistemas."
    },
    {
        "pregunta": "¿Es posible integrar el gestor con otros sistemas o software?",
        "respuesta": "Sí, ofrecemos opciones de integración mediante APIs y exportación de datos para conectarte con sistemas contables, ERP o plataformas de ventas."
    },
    {
        "pregunta": "¿Cómo se asegura la privacidad y seguridad de mis datos?",
        "respuesta": "Contamos con protocolos de seguridad avanzados, encriptación de datos y backups automáticos para garantizar la protección y disponibilidad de tu información."
    },
    {
        "pregunta": "¿Puedo gestionar múltiples ubicaciones o sucursales?",
        "respuesta": "Sí, el sistema permite administrar inventarios de múltiples sucursales o almacenes desde una única plataforma."
    }
]

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const toggleFAQ = (index: number) => {
        setActiveIndex(prev => prev === index ? null : index);
    };
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     async function fetchPreguntas() {
    //         const response = await fetch('/stocker/preguntas.json');
    //         const data = await response.json();
    //         setPreguntas(data);
    //     }
    //     fetchPreguntas();
    // }, []);

    const preguntas = questions;


    return (
        <section className="my-24 mx-auto max-w-limit">
            <div className="w-full flex flex-col items-center justify-center my-12 ">
                <Badge text="Preguntas Frecuentes" />
                <h2 className='section-title text-center'>Todo lo que necesitas saber</h2>
            </div>
            <div className="flex flex-col w-full mx-auto px-3 lg:flex-row lg:w-[90%] lg:p-8 gap-8 lg:gap-0">
                <div className="w-full overflow-hidden lg:w-[40%]">
                    <img
                        src="images/faq.jpg"
                        alt=""
                        className="rounded-lg w-full h-[180px] object-cover lg:object-none lg:h-auto lg:w-auto"
                    />
                </div>
                <div className="flex flex-col items-center gap-[10px] w-full px-0 md:px-20 lg:w-[60%]">
                    {error && <p className="text-red-500">{error}</p>}
                    {preguntas.length === 0 && !error && (
                        <p className="text-neutral-500">No hay preguntas disponibles.</p>
                    )}
                    {preguntas.map((pregunta, idx) => (
                        <div className="w-full select-none" key={idx}>
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className={clsx(
                                    "w-full flex justify-between items-center text-left gap-2 px-5 py-3 text-lg lg:text-lg transition-all cursor-pointer",
                                    activeIndex === idx
                                        ? "bg-neutral-100 text-neutral-900"
                                        : "bg-white text-neutral-700"
                                )}
                            >
                                <span
                                    className={clsx(
                                        "flex-1 transition-transform duration-300",
                                    )}
                                >
                                    {pregunta.pregunta}
                                </span>

                                <span className={clsx(
                                    "transition-transform duration-300",
                                    activeIndex === idx && "rotate-[135deg]"
                                )}>
                                    <svg className="w-7 h-7 shrink-0 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#303030">
                                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={clsx(
                                    "grid transition-[grid-template-rows] duration-300 ease-in-out px-6 border-t border-t-[#878787]",
                                    activeIndex === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <p className="text-neutral-500 my-4 text-base md:text-md leading-snug">
                                        {pregunta.respuesta}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};