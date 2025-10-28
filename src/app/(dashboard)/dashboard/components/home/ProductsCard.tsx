import React from "react";
import { TopCard } from "./TopCard";
import { Package } from "lucide-react";
import { auth } from "@/auth";
import { backendRequest } from "@/app/hooks/useBackendServer";
import { TopCardLink } from "./TopCardLink";

export const ProductsCard = async () => {
  const session = await auth();
  const token = session?.user?.accessToken;
  const products = await backendRequest(`/api/products`, { token })
    .then((res) => res)
    .catch(() => []);

  return (
    <TopCardLink to="/dashboard/articles">
      <TopCard
        title="Productos registrados"
        value={products.length}
        icon={<Package className="size-6 text-blue-text" />}
      />
    </TopCardLink>
  );
};
