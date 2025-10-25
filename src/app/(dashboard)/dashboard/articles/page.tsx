import React from 'react'
import DashContainer from '../components/DashContainer';
import Cop from './Cop';
import { SearchProducts } from './components/SearchProducts';
import { Categories } from './components/Categories';
import Button from '@/app/ui/Button';
import { Plus } from 'lucide-react';
import { TableProducts } from './components/TableProducts';
import NewProduct from './components/NewProduct';
import { ArticlesServerComponent } from './components/ArticlesServerComponent';

export default function page({ searchParams }: { searchParams: { search?: string; category?: string } }) {
  const { search = '', category = ''} = searchParams;

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center">
        <ArticlesServerComponent search={search} category={category} />
        <div className="flex justify-baseline items-center gap-2 ">
          <SearchProducts placeholder="Buscar" />
          <Categories />
        </div>
        <div className="flex gap-2">
          <Button variant="alternative">Acciones</Button>
          <NewProduct />
        </div>
      </div>
      <TableProducts />
      <div className="flex items-center bg-white drop-shadow-2xl drop-shadow-black/20 w-full h-20 absolute left-0 bottom-0 px-7">
        <div>
          <span className="font-medium text-sm">
            1 producto seleccionado(s)
          </span>
        </div>
      </div>
    </div>
  );
}
