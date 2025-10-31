import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react'
import { useProductStore } from '../../../../../stores/product';

type ItemPriceProps = {
  locale?: string;
  currency?: string;
};


export const SectionPrice = ({
  locale = "es-ES",
  currency = "COP",
}: ItemPriceProps) => {
  const { price, setPrice } = useProductStore();
  const [raw, setRaw] = useState<string>(
    price !== null && price !== undefined ? String(price) : ""
  );

  // Si `val` cambia desde fuera, sincronizamos la vista (sin formateo si el input está activo)
  useEffect(() => {
    setRaw(String(price));
  }, [price]);

  const numberPattern = /^-?(?:\d+|\d*\.\d+|\d+\.)$/; // admite "123", ".5", "12.", "12.34"

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;

    // Quitamos símbolos de moneda y espacios, permitimos dígitos, comas, puntos y signo menos
    input = input.replace(/\s/g, "").replace(/[^0-9,.\-]/g, "");

    // Normalizamos comas a puntos para parsear
    const normalized = input.replace(/,/g, ".");

    // Guardamos la visualización tal cual escribe el usuario
    setRaw(input);

    // Si el texto coincide con un número válido (incluye "12." y ".5") actualizamos el valor numérico
    if (numberPattern.test(normalized)) {
      const parsed = parseFloat(normalized);
      if (!Number.isNaN(parsed)) {
        setPrice(parsed);
        return;
      }
    }

    // Si la entrada queda vacía o es solo "-" -> consideramos null (sin precio)
    if (input === "" || input === "-") {
      setPrice(0);
      return;
    }

    // Si no es un número válido aún, no tocamos `set` (dejamos el último número válido intacto)
  };

  const handleFocus = () => {
    // Al enfocar mostramos la versión sin formato (número limpio)
    if (price !== null && price !== undefined) {
      // usa punto decimal para facilitar la edición (el usuario puede escribir con coma si quiere)
      setRaw(String(price));
    } else {
      setRaw("");
    }
  };

  const handleBlur = () => {
    // Al perder foco, si hay un número lo formateamos a moneda
    if (price !== null && price !== undefined && !Number.isNaN(price)) {
      const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(price);
      setRaw(formatted);
    } else {
      // si no hay valor válido, limpiar o mantener vacío
      setRaw("");
    }
  };

  return (
    <div className="mt-6 grid gap-3">
      <Label htmlFor="price-input">Precio</Label>
      <Input
        id="price-input"
        name="price"
        inputMode="decimal"
        autoComplete="off"
        value={raw}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Precio del producto"
        // type="text" para que no restrinja la entrada al formateo del browser
        type="text"
        required
      />
    </div>
  );
};
