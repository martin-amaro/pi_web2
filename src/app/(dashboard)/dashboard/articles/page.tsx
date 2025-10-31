import React from "react";
import DashContainer from "../components/DashContainer";
import Cop from "./Cop";
import { SearchProducts } from "./components/SearchProducts";
import { Categories } from "./components/Categories";
import Button from "@/app/ui/Button";
import { Plus } from "lucide-react";
import { TableProducts } from "./components/TableProducts";
import NewProduct from "./components/new_product/NewProduct";
import { ArticlesServerComponent } from "./components/ArticlesServerComponent";
import { ProductPreview } from "./components/product_view/ProductPreview";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const params = await searchParams;
  const { query = "", category = "" } = params;

  return (
    <DashContainer
      header="Artículos y servicios"
      title=""
      subtitle=""
    >
      <div className="w-full">
        <ProductPreview></ProductPreview>
        <ArticlesServerComponent search={query} category={category} />
      </div>
    </DashContainer>
  );
}
