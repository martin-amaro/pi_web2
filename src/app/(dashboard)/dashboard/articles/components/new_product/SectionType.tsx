import React from 'react'
import { useProductStore } from './store';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { articleTypes } from '@/app/constants/articles';

export const SectionType = () => {
  const { type, setType } = useProductStore();

  return (
    <div className="grid gap-3">
      <Label>Tipo de artículo</Label>
      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-full h-10! font-[400] text-black">
          <SelectValue placeholder="Selecciona un tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(articleTypes).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value[0]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
