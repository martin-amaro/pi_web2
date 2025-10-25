"use client";
import { useBusiness } from "@/app/context/BusinessContext";
import { getCategoryName } from "@/app/utils/business";
import { formatCurrency } from "@/app/utils/misc";
import { Ellipsis, Image } from "lucide-react";
import { useState, useEffect } from "react";

type Article = {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  stock: number;
};

type Props = {
  initialArticles: Article[];
  categories: string[];
};

export default function ArticlesTableClientComponent({
  initialArticles,
  categories,
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

  const toggleSelectOne = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);

    setSelectedIds(newSet);
    setSelectAll(newSet.size === articles.length);
  };

  return (
    <div className="rounded-lg md:pt-0 overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 table-fixed mt-6 font-normal!">
        <thead className="text-[.8rem] text-gray-700 font-normal! border-b border-[#b3b3b3] bg-gray-50">
          <tr className="">
            <th className="w-[30%] px-6 py-3">
              <div className="flex items-center gap-3">
               
                <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
              />
                <span>Nombre</span>
              </div>
            </th>
            <th className="w-[20%] px-6 py-3">Categoría</th>
            <th className="w-[20%] px-6 py-3">Disponibilidad</th>
            <th className="w-[15%] px-6 py-3">Precio</th>
            <th className="w-[10%] px-6 py-3">Stock</th>
            <th className="w-[5%] px-6 py-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {articles.map((article) => (
            <Item key={article.id} article={article} toggle={toggleSelectOne} selectedIds={selectedIds} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Item = ({article, toggle, selectedIds}: {article: Article, toggle: (id: string) => void, selectedIds: Set<string>}) => {
  const { categories } = useBusiness();
  return (
    <tr className="border-b border-[#f2f2f2] hover:bg-[#e6f0ff] h-14 text-[#1a1a1a] cursor-pointer">
      <td className="px-6">
        <div className="flex items-center gap-3">
          <input
            id="checkbox-row"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
            checked={selectedIds.has(article.id)}
            onChange={() => toggle(article.id)}
          />
          <div className="flex justify-center items-center size-9 rounded-sm bg-[#f2f2f2] text-[#d9d9d9]">
            <Image className="size-5" />
          </div>
          <span>{article.name}</span>
        </div>
      </td>
      <td className="px-6">{getCategoryName(categories, article.categoryId)}</td>
      <td className="px-6 text-green-700 font-medium">Disponible</td>
      <td className="px-6">{formatCurrency(article.price)}</td>
      <td className="px-6">{article.stock}</td>
      <td className="px-6 text-right">
        <Ellipsis className="text-gray-400 hover:text-gray-600 transition-colors" />
      </td>
    </tr>
  );
};
