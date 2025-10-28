export const getCategoryName = (categories: any[], categoryId?: string | null) =>
    categories?.find?.(
        (cat) => cat?.id?.toString?.() === categoryId?.toString?.()
    )?.name ?? "Sin categoría";
