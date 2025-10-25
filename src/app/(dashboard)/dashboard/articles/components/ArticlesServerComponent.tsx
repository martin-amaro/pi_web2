import useAuth from '@/app/hooks/useAuth'
import { backendRequest } from '@/app/hooks/useBackendServer'
import { auth } from '@/auth'
import React from 'react'
import ArticlesTableClientComponent from './ArticlesTableClientComponent'
import { useBusiness } from '@/app/context/BusinessContext'

export const ArticlesServerComponent = async ({ search, category} : { search: string, category: string}) => {

    const session = await auth();
    const token = session?.user?.accessToken;
    const products = await backendRequest('/api/products', { token });
    const categories = await backendRequest('/categories', { token });

  return (
    <div>
      {/* {products.map((product: any) => (
            <div key={product.id}>{product.name}</div>
        ))} */}
      <ArticlesTableClientComponent
        initialArticles={products}
        categories={categories}
      />
    </div>
  );
}
