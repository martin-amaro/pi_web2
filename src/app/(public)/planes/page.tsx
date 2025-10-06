import React from 'react'
import { Check, X } from 'lucide-react'  
import Button from '@/app/ui/Button';

const plans = [
  {
    name: 'Basic',
    description: 'Perfecto para emprendedores y pequeños negocios',
    price: 'Gratis',
    period: '',
    features: [
      { name: 'Hasta 100 productos', included: true },
      { name: 'Control básico de inventario', included: true },
      { name: '1 usuario', included: true },
      { name: 'Reportes básicos', included: true },
      { name: 'Soporte por email', included: true },
      { name: 'API Access', included: false },
      { name: 'Integraciones', included: false },
      { name: 'Soporte 24/7', included: false },
    ],
    buttonText: 'Comenzar gratis',
    buttonLink: '/register',
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'Ideal para negocios en crecimiento',
    price: '$29.99',
    period: '/mes',
    features: [
      { name: 'Productos ilimitados', included: true },
      { name: 'Control avanzado de inventario', included: true },
      { name: 'Hasta 5 usuarios', included: true },
      { name: 'Reportes avanzados', included: true },
      { name: 'Soporte prioritario', included: true },
      { name: 'API Access', included: true },
      { name: 'Integraciones básicas', included: true },
      { name: 'Soporte 24/7', included: false },
    ],
    buttonText: 'Comenzar prueba gratuita',
    buttonLink: '/register?plan=pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'Para grandes empresas con necesidades específicas',
    price: '$99.99',
    period: '/mes',
    features: [
      { name: 'Todo lo de Professional', included: true },
      { name: 'Usuarios ilimitados', included: true },
      { name: 'API personalizada', included: true },
      { name: 'Integraciones avanzadas', included: true },
      { name: 'Soporte 24/7', included: true },
      { name: 'Capacitación personalizada', included: true },
      { name: 'SLA garantizado', included: true },
      { name: 'Ambiente de pruebas', included: true },
    ],
    buttonText: 'Contactar ventas',
    buttonLink: '/contact',
    highlighted: false,
  },
];

export const PricingPlans = () => {
  return (
    <div className='py-24 bg-gradient-to-b from-white to-[#f3f6fb]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold font-display text-title sm:text-4xl lg:text-5xl'>
            Planes que se ajustan a tu negocio
          </h2>
          <p className='mt-4 text-xl text-gray-600 font-app'>
            Escoge el plan perfecto para tu necesidad
          </p>
        </div>

        <div className='mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3'>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border border-gray-200 p-8 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                plan.highlighted
                  ? 'border-blue-500 shadow-blue-100 hover:shadow-blue-100'
                  : 'hover:border-gray-300'
              }`}
            >
              {plan.highlighted && (
                <div className='absolute -top-4 left-0 right-0'>
                  <div className='mx-auto w-32 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-white'>
                    Más popular
                  </div>
                </div>
              )}

              <div className='mb-6'>
                <h3 className='text-2xl font-bold font-display text-title'>
                  {plan.name}
                </h3>
                <p className='mt-2 font-app text-gray-500'>
                  {plan.description}
                </p>
                <div className='mt-4'>
                  <span className='text-4xl font-bold font-display text-title'>
                    {plan.price}
                  </span>
                  <span className='text-gray-500 font-app'>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className='mb-6 space-y-4 flex-1'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='flex items-center gap-2'>
                    {feature.included ? (
                      <Check className='h-5 w-5 text-primary' />
                    ) : (
                      <X className='h-5 w-5 text-gray-400' />
                    )}
                    <span
                      className={`font-app ${
                        feature.included
                          ? 'text-gray-700'
                          : 'text-gray-500'
                      }`}
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                // href={plan.buttonLink}
                className={`btn-main w-full text-center ${
                  plan.highlighted
                    ? 'bg-primary hover:bg-primary/90'
                    : 'bg-gray-800 hover:bg-gray-900'
                }`}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <PricingPlans />;
}

