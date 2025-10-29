import React from "react";
import { useProductStore } from "../../../../../stores/product";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { InputError } from "../../../components/InputError";
import { generateDescriptionForProduct } from "@/app/utils/ai";
import { toast } from "sonner";
import Button from "@/app/ui/Button";
import { Sparkle } from "lucide-react";

export const SectionDescription = () => {
  const {
    description,
    setDescription,
    error,
    loadingAI,
    setLoadingAI,
    name,
    loading,
  } = useProductStore();

  const handleGenerateAI = async () => {
    setLoadingAI(true);
    try {
      const desc = await generateDescriptionForProduct(name);
      setDescription(desc);
    } catch (error) {
      toast.error("Error al generar la descripción con IA.");
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="grid gap-3">
      <Label>Descripción</Label>
      <Textarea
        className="w-full resize-none max-h-[200px]!"
        maxLength={255}
        autoComplete="off"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe el producto aquí"
        required
      />
      {error && <InputError message={error.description} />}
      <div>
        <Button
          variant="alternative"
          className="p-2! text-sm! flex gap-2 h-auto!"
          onClick={handleGenerateAI}
          disabled={name.trim() === "" || loading || loadingAI}
        >
          <Sparkle className="size-4" />
          {loadingAI ? "Generando..." : "Generar descripción con IA"}
        </Button>
      </div>
    </div>
  );
};
