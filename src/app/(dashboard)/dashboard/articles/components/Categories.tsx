"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBusiness } from "@/app/context/BusinessContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Categories = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const { categories } = useBusiness();
  const [category, setCategory] = useState(params.get("category") || "all");

  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    if (category && category !== "all") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [category]);

  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="w-full md:w-50 h-10! font-[400] text-black">
        <SelectValue placeholder="Selecciona un tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}

          <SelectItem value={"all"}>
            <div className="flex items-center gap-2 ">Todas las categorías</div>
          </SelectItem>

          {categories.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              <div className="flex items-center gap-2 ">{item.name}</div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
