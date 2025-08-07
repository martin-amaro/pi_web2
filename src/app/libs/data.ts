import { APP_NAME } from "../config";

export const footerSections = [
  {
    title: 'Servicios',
    links: [
      { label: 'Soluciones de Inventario', href: '/inventario' },
      { label: 'Gestión de Stock', href: '/stock' },
      { label: 'Análisis de Productos', href: '/analisis' },
      { label: 'Eficiencia en Almacén', href: '/almacen' },
      { label: 'Roles', href: '/roles' },
    ],
  },
  {
    title: 'Tipos de Negocios',
    links: [
      { label: 'Restaurantes', href: '/negocios/restaurantes' },
      { label: 'Transporte y Logística', href: '/negocios/logistica' },
      { label: 'Bars y Licorerías', href: '/negocios/licorerias' },
      { label: 'Salón de Belleza', href: '/negocios/belleza' },
      { label: 'Barberías', href: '/negocios/barberias' },
      { label: 'Spa', href: '/negocios/spa' },
      { label: 'Construcción', href: '/negocios/construccion' },
      { label: 'Franquicias', href: '/negocios/franquicias' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Planes', href: '/planes' },
      { label: `¿Por qué ${APP_NAME || 'Nuestra App'}?`, href: '/por-que' },
      { label: 'Testimonios', href: '/testimonios' },
      { label: 'Ventas', href: '/ventas' },
      { label: 'Soporte Técnico', href: '/soporte' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'Acerca de', href: '/acerca' },
      { label: 'Aliados', href: '/aliados' },
      { label: 'Licencias', href: '/licencias' },
      { label: 'Términos', href: '/terminos' },
    ],
  },
]
