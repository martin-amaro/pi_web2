import React, { useState } from 'react'
import { NewCategory } from './NewCategory';
import { UpdateCategory } from './UpdateCategory';
import { useProductStore } from '../../../../../stores/product';
import { useBusiness } from '@/app/context/BusinessContext';
import { Folder } from 'lucide-react';
import { getCategoryName } from '@/app/utils/business';

export const SectionCategory = () => {
  const { category, setCategory } = useProductStore();
  const [open, setOpen] = useState(false);
  const [openNw, setOpenNw] = useState(false);
  const { categories } = useBusiness();

  const handleSave = async (name?: string) => {};

  return (
    <div className="mt-8 border-b border-gray-200 pb-4 flex flex-col middle:flex-row middle:items-center justify-between">
      <div className="space-y-1">
        <div className="flex gap-2 ">
          <Folder />
          <label className="font-medium text-base text-slate-800 mb-1 block">
            Categoría
          </label>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-neutral-500 text-sm">
            {getCategoryName(categories, category)}
          </p>
        </div>
      </div>
      <div className="mt-4 middle:mt-0 middle:ml-4 whitespace-nowrap gap-1 flex">
        <NewCategory
          open={open}
          setOpen={setOpen}
        />
        <span className="border-l"></span>
        <UpdateCategory
          open={openNw}
          setOpen={setOpenNw}
        />
      </div>
    </div>
  );
}
