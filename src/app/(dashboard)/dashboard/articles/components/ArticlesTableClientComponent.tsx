"use client";
import { Checkbox } from "@/app/components/Checkbox";
import { useBusiness } from "@/app/context/BusinessContext";
import { Article } from "@/app/libs/definitions";
import { getCategoryName } from "@/app/utils/business";
import { formatCurrency } from "@/app/utils/misc";
import clsx from "clsx";
import { Check, ChevronDown, Ellipsis, Image } from "lucide-react";
import { useState, useEffect } from "react";
import { useProductStore } from "../../../../stores/product";
import Button from "@/app/ui/Button";
import { ActionsProduct } from "./ActionsProduct";
import { ButtonActions } from "./ButtonActions";

type Props = {
  initialArticles: Article[];
};

export default function ArticlesTableClientComponent({
  initialArticles,
}: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const [searchQuery, setSearchQuery] = useState(""); // puede venir del SearchBar
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    let filtered = initialArticles;

    if (searchQuery) {
      filtered = filtered.filter((a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((a) => a.categoryId === categoryFilter);
    }

    setArticles(filtered);
    setSelectedIds(new Set()); // opcional: reset de selección al filtrar
    setSelectAll(false);
  }, [searchQuery, categoryFilter, initialArticles]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds(new Set());
      setSelectAll(false);
    } else {
      setSelectedIds(new Set(articles.map((a) => a.id)));
      setSelectAll(true);
    }
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
    setSelectAll(false);
  }

  const toggleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);

    setSelectedIds(newSet);
    setSelectAll(newSet.size === articles.length);
  };

  return (
    <div className="rounded-lg md:pt-0 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 table-fixed mt-6 font-normal! table-caption md:table">
        <thead className="text-[.8rem] text-gray-700 font-normal! border-b border-[#b3b3b3] bg-gray-50 rounded-lg">
          <tr className="">
            <th className="w-[30%] px-6 py-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={toggleSelectAll}
                />
                <span>Nombre</span>
              </div>
            </th>
            <th className="w-[20%] px-6 py-3max-h-1/2">Categoría</th>
            <th className="w-[20%] px-6 py-3">Disponibilidad</th>
            <th className="w-[15%] px-6 py-3">Precio</th>
            <th className="w-[10%] px-6 py-3">Stock</th>
            <th className="w-[5%] px-6 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {articles.map((article) => (
            <Item
              key={article.id}
              article={article}
              toggle={toggleSelectOne}
              selectedIds={selectedIds}
            />
          ))}
        </tbody>
      </table>

      {selectedIds.size > 0 && (
        <div className="flex justify-between items-center bg-white drop-shadow-2xl drop-shadow-black/20 w-full h-20 absolute left-0 bottom-0 px-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex font-medium text-sm">
              {selectedIds.size} artículo(s) seleccionado(s)
            </span>
            <Button variant="secondary" onClick={deselectAll}>
              Deseleccionar todo
            </Button>
          </div>
          <ActionsProduct />
        </div>
      )}
    </div>
  );
}

const Item = ({
  article,
  toggle,
  selectedIds,
  className = "",
}: {
  article: Article;
  toggle: (id: string) => void;
  selectedIds: Set<string>;
  className?: string;
}) => {
  const { categories } = useBusiness();

  return (
    <tr
      className={clsx(
        "border-b border-[#f2f2f2] hover:bg-[#e6f0ff] h-14 text-[#1a1a1a] cursor-pointer last:border-none",
        article.active ? "" : "opacity-60",
        className
      )}
      onClick={() => useProductStore.getState().setProduct(article, true)}
    >
      <td className="px-6">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedIds.has(article.id)}
            onCheckedChange={(e) => toggle(article.id)}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="flex justify-center items-center size-9 rounded-sm bg-[#f2f2f2] text-[#d9d9d9] overflow-hidden">
            {article.thumbnailUrl ? (
              <img src={article.thumbnailUrl} alt={article.name} className="" />
            ) : (
              <Image className="size-5" />
            )}
          </div>
          <span className="font-medium text-neutral-700">{article.name}</span>
        </div>
      </td>
      <td className="px-6">
        {getCategoryName(categories, article.categoryId)}
      </td>
      <td
        className={clsx(
          "px-6 font-medium",
          article.active ? "text-green-700" : "text-red-500"
        )}
      >
        {article.active ? "Disponible" : "No disponible"}
      </td>
      <td className="px-6">{formatCurrency(article.price)}</td>
      <td className="px-6">{article.stock}</td>
      <td
        className="px-6 text-right"
        onClick={(e) => {
          e.stopPropagation();
        }}
        // 
      >
        <ButtonActions article={article}/>
      </td>
    </tr>
  );
};
