"use client"; // ✅ obligatorio, es un Client Component
import { useState, useEffect } from "react";

type Article = {
  id: string;
  title: string;
  category: string;
  // otros campos...
};

type Props = {
  initialArticles: Article[];
  categories: string[];
};

export default function ArticlesTableClientComponent({
  initialArticles,
  categories,
}: Props) {
  // 1️⃣ Estado de artículos filtrados y seleccionados
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const [searchQuery, setSearchQuery] = useState(""); // puede venir del SearchBar
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // 2️⃣ Filtrado de artículos según búsqueda y categoría
  useEffect(() => {
    let filtered = initialArticles;

    if (searchQuery) {
      filtered = filtered.filter((a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((a) => a.category === categoryFilter);
    }

    setArticles(filtered);
    setSelectedIds(new Set()); // opcional: reset de selección al filtrar
    setSelectAll(false);
  }, [searchQuery, categoryFilter, initialArticles]);

  // 3️⃣ Manejo de checkboxes
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
    <div>
      {/* Search y filtros */}
      {/* <SearchBar value={searchQuery} onChange={setSearchQuery} /> */}
      {/* Aquí podrías agregar un dropdown para categoryFilter */}

      {/* Tabla */}
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
              />
            </th>
            <th>Título</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.has(article.id)}
                  onChange={() => toggleSelectOne(article.id)}
                />
              </td>
              <td>{article.name}</td>
              <td>{article.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
