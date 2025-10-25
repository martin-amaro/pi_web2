import useAuth from '@/app/hooks/useAuth'
import { backendRequest } from '@/app/hooks/useBackendServer'
import { auth } from '@/auth'
import React from 'react'
import ArticlesTableClientComponent from './ArticlesTableClientComponent'
import { useBusiness } from '@/app/context/BusinessContext'
import { SearchProducts } from './SearchProducts'
import { Categories } from './Categories'
import NewProduct from './NewProduct'
import Button from '@/app/ui/Button'

export const ArticlesServerComponent = async ({ search, category }: { search: string, category: string }) => {

  const session = await auth();
  const token = session?.user?.accessToken;
  const categories = await backendRequest('/categories', { token });
  const request = await backendRequest(`/api/products/search?query=${search}`, { token });
  const products = request?.content || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex justify-baseline items-center gap-2 ">
          <SearchProducts placeholder="Buscar" />
          <Categories />
        </div>
        <div className="flex gap-2">
          <Button variant="alternative">Acciones</Button>
          <NewProduct />
        </div>
      </div>
      <ArticlesTableClientComponent
        initialArticles={products}
        categories={categories}
      />
    </>
  );
}
