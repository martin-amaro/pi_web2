import React from 'react';
import { ClipboardList, GraduationCap, Box, AlertCircle, CheckCircle, Megaphone } from 'lucide-react';
import clsx from 'clsx';

const features = [
  {
    icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
    title: 'Inspecciones y Checklists',
    description: 'Digitaliza cualquier proceso o política. Captura datos y comparte reportes al instante.',
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    title: 'Capacitaciones',
    description: 'Incorpora y entrena al equipo rápidamente. Crea cursos y guarda registros de finalización.',
  },
  {
    icon: <Box className="w-6 h-6 text-blue-600" />,
    title: 'Gestión de Activos',
    description: 'Visualiza el historial y la actividad de tus activos en un solo lugar.',
  },
  {
    icon: <AlertCircle className="w-6 h-6 text-blue-600" />,
    title: 'Reportes de Incidentes',
    description: 'Captura observaciones, riesgos o incidentes en tiempo real para una resolución ágil.',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
    title: 'Gestión de Tareas',
    description: 'Asigna tareas y da seguimiento con flujos de trabajo fluidos.',
  },
  {
    icon: <Megaphone className="w-6 h-6 text-blue-600" />,
    title: 'Comunicaciones',
    description: 'Envía mensajes internos claros y rastreables al equipo.',
  },
];

export default function FeatureCards() {
  return (
    <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {features.map((feature, idx) => (
          <div
            key={idx}
            className={clsx(
              "border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer", 
              "hover:outline-3 outline-blue-500 hover:shadow-md transition flex flex-col justify-between"
            )}
          >
            <div>
                <div className="mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
            </div>

            <div>
                <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline inline-flex items-center"
                >
                Aprende más →
                </a>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
