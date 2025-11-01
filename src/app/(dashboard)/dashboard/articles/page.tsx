import React, { Suspense } from "react";
import DashContainer from "../components/DashContainer";
import { ArticlesServerComponent } from "./components/ArticlesServerComponent";
import { ProductPreview } from "./components/product_view/ProductPreview";
import { Loading } from "@/app/components/Loading";

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
        <Suspense fallback={<Loading className="min-h-40! h-40!"/>}>
          <ArticlesServerComponent search={query} category={category} />

        </Suspense>
        
      </div>
    </DashContainer>
  );
}
