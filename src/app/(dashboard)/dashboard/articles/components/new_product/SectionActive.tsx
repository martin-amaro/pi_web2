import { Checkbox } from '@/app/components/Checkbox';
import { useProductStore } from '@/app/stores/product';
import { Label } from '@/components/ui/label';
import React from 'react'

export const SectionActive = () => {
  const { active, setActive } = useProductStore();

  return (
    <div className="mt-8 grid gap-3">
      <Label htmlFor="item-disponibility">Disponibilidad</Label>
      <p>Marca si este artículo se encuentra disponible.</p>
      <Checkbox id="item-disponibility" label="Marcar como disponible" defaultChecked={active} onCheckedChange={setActive}/>
    </div>
  );
}
