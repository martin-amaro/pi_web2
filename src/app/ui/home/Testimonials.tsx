import React from 'react';
import { APP_NAME } from '@/app/config';
import { Badge } from '../Badge';
import Image from 'next/image';

const testimonials = [
    {
        name: 'Carla Méndez',
        image: 'testimonials/1.jpg',
        text: `Desde que uso ${APP_NAME}, llevo el control de mis productos sin estrés. Puedo saber exactamente qué tengo, qué necesito reponer y qué no se está vendiendo. Me ahorra horas de trabajo cada semana.`
    },
    {
        name: 'Sebastián Ruiz',
        image: 'testimonials/2.jpg',
        text: `${APP_NAME} es simplemente indispensable. La interfaz es clara, rápida y confiable.`
    },
    {
        name: 'Andrés Peralta',
        image: 'testimonials/3.jpg',
        text: 'Optimizamos la gestión del inventario y redujimos el desperdicio en un 30%. Nos permitió automatizar tareas repetitivas y tener una visión más clara de las ventas y rotación de productos.'
    },
    {
        name: 'Carlos Pérez',
        image: 'testimonials/4.jpg',
        text: `En nuestro rubro, llevar un control preciso es clave. ${APP_NAME} nos da la tranquilidad de saber qué productos están por vencer, cuándo reponer y cómo mantener el inventario al día sin complicaciones.`
    },
    {
        name: 'Martina López',
        image: 'testimonials/5.jpg',
        text: `Antes todo era en hojas de cálculo. Desde que implementamos ${APP_NAME}, el flujo de trabajo mejoró muchísimo. El equipo puede consultar el estado del inventario en tiempo real, y eso hace una gran diferencia.`
    },
    {
        name: 'Juan Herrera',
        image: 'testimonials/6.jpg',
        text: 'Nunca imaginé que llevar el control del inventario pudiera ser tan sencillo. Ahora sé con exactitud qué títulos tengo, cuáles se venden más y qué necesito reponer. Ahorré tiempo, evité errores y puedo concentrarme en lo que más me gusta: atender a mis clientes.'
    }
];



export default function Testimonials() {
    const columns: { name: string; image: string; text: string }[][] = [[], [], []];
    testimonials.forEach((testimonial, index) => {
        columns[index % 3].push(testimonial);
    });

    return (
        <>
            <div className="w-full bg-white px-5 py-16 md:py-24 text-gray-800">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center max-w-xl mx-auto">
                        <Badge text="Testimonios" />
                        <h1 className="text-6xl md:text-6xl font-bold mb-5 text-title font-display">Lo que dice<br />la gente.</h1>
                        <h3 className="text-xl mb-5 font-light">Historiales reales, de casos reales.</h3>
                        <div className="text-center mb-10">
                            <span className="inline-block w-60 h-1 rounded-full bg-indigo-500"></span>
                        </div>
                    </div>
                    <div className="-mx-3 md:flex items-start">
                        {columns.map((col, i) => (
                            <div key={i} className="px-3 md:w-1/3">
                                {col.map((testimonial, j) => (
                                    <TestimonialCard key={j} {...testimonial} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

const TestimonialCard = ({ name, image, text }: { name: string, image: string, text: string }) => (
    <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
        <div className="w-full flex mb-4 items-center">
            <div className="overflow-hidden rounded-full bg-gray-50 border border-gray-200">
                <Image
                    src={`/images/${image}`}
                    alt={name}
                    width={40}
                    height={40}
                />
            </div>
            <div className="flex-grow pl-3">
                <h6 className="font-bold text-sm uppercase text-gray-600">{name}.</h6>
            </div>
        </div>
        <div className="w-full">
            <p className="text-sm leading-tight">
                <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                {text}
                <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span>
            </p>
        </div>
    </div>
);
