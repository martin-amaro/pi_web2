export const generateDescriptionForProduct = async (productName: string) => {
  const res = await fetch("/api/description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName }),
  });

  if (!res.ok) throw new Error("Error al generar descripción");

  const data = await res.json();
  return data.description;
};
