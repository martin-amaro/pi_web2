import React from 'react'
import DashContainer from '../components/DashContainer';
import Cop from './Cop';

export default function page() {
  return (
    <DashContainer
      header="Artículos y Servicios"
      title="Artículos y Servicios"
      subtitle="Gestiona tu inventario y catálogo de servicios de manera eficiente"
      
    >
      <p>hola</p>
      <Cop></Cop>
    </DashContainer>
  );
}
