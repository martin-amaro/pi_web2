"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Categories = () => {
  return (
    <Select value={"all"} onValueChange={() => {}} >
      <SelectTrigger className="w-50 h-10! font-[400] text-black">
        <SelectValue placeholder="Selecciona un tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {/* {Object.entries(BusinessType).map(([key, value]) => (
            <SelectItem key={key} value={key}>
              <div className="flex items-center gap-2 ">
                {value[1]} {value[0]}
              </div>
            </SelectItem>
          ))} */}

          <SelectItem  value={"all"}>
            <div className="flex items-center gap-2 ">
              Todas las categorías
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
