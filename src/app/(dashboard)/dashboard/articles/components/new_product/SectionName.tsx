import React from "react";
import { useProductStore } from "../../../../../stores/product";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputError } from "../../../components/InputError";

export const SectionName = () => {
  const { name, setName, error } = useProductStore();

  return (
    <>
      <div className="grid gap-3">
        <Label>Nombre</Label>
        <Input
          name="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del producto"
          required
        />
        {error && <InputError message={error.name} />}
      </div>
    </>
  );
};
