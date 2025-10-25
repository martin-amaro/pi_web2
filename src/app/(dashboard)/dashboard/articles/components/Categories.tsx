"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBusiness } from "@/app/context/BusinessContext";

export const Categories = () => {
  const { categories } = useBusiness();
  const [category, setCategory] = useState("all");

  return (
    <Select value={category} onValueChange={setCategory}>
      <SelectTrigger className="w-50 h-10! font-[400] text-black">
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
