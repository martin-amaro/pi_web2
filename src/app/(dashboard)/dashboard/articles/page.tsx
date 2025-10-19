import React from 'react'
import DashContainer from '../components/DashContainer';
import Cop from './Cop';

export default function page() {
  return (
    <DashContainer
      title="Artículos y Servicios"
      subtitle="Gestiona tu inventario y catálogo de servicios de manera eficiente"
    >
      <Cop />
    </DashContainer>
  );
}
