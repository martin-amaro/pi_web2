'use client'
import React from 'react'
import DashContainer from '../components/DashContainer';
import { UpdateBusinessName } from './components/UpdateBusinessName';
import { UpdateBusinessType } from './components/UpdateBusinessType';
import { useBusiness } from '@/app/context/BusinessContext';
import { Subscription } from './components/Subscription';

export default function page() {

  const businessId = "12345"; // Reemplaza con la lógica para obtener el ID del negocio
  const {business, refreshBusiness, loading, getBusinessProp} = useBusiness();


  return (
    <DashContainer header="Mi negocio" title="Acerca de" subtitle="">
      <div className="max-w-[600px]">
        <UpdateBusinessName />
        <UpdateBusinessType />
        <Subscription />
      </div>
    </DashContainer>
  );
}
