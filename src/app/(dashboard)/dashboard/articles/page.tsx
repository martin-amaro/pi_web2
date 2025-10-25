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

export default async function Page({ searchParams }: { searchParams: Promise<{ query?: string; category?: string }> }) {
  const params = await searchParams;
  const { query = '', category = '' } = params;

  return (
    <div className="p-6 w-full">
      <ArticlesServerComponent search={query} category={category} />

      
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
