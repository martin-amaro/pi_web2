export const getCategoryName = (categories: any[], categoryId: string) => {
    const category = categories.find((cat) => cat.id.toString() === categoryId);
    return category ? category.name : "Sin categoría";
};