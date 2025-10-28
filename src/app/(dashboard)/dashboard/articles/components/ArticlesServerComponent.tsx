import useAuth from "@/app/hooks/useAuth";
import { backendRequest } from "@/app/hooks/useBackendServer";
import { auth } from "@/auth";
import React from "react";
import ArticlesTableClientComponent from "./ArticlesTableClientComponent";
import { useBusiness } from "@/app/context/BusinessContext";
import { SearchProducts } from "./SearchProducts";
import { Categories } from "./Categories";
import NewProduct from "./new_product/NewProduct";
import Button from "@/app/ui/Button";
import { Article } from "@/app/libs/definitions";
import { NoArticles } from "./NoArticles";
import { NoResultsArticles } from "./NoResultsArticles";

export const ArticlesServerComponent = async ({
  search,
  category,
}: {
  search: string;
  category: string;
}) => {
  const session = await auth();
  const token = session?.user?.accessToken;
  let products:Article[] = [];
  try {
    const request = await backendRequest(
      `/api/products/search?query=${search}&category=${category}`,
      { token }
    );
    products = request?.content || [];
    console.log(products)
  } catch (e) {
    products = [];
  }

  return (
    <div>
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
      {
        products.length ? (
          <ArticlesTableClientComponent initialArticles={products} />
        ) : category || search ? 
          <NoResultsArticles/>
          : 
          <NoArticles />
      }
    </div>
  );
};
