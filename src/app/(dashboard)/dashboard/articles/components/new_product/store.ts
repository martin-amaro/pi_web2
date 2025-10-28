import { Article } from "@/app/libs/definitions";
import { create } from "zustand";

type ProductStore = {
  productId?: number; // id del producto al editar
  open: boolean;
  name: string;
  description: string;
  type: string;
  price: number;
  images: File[];
  removedImages: string[];
  thumb: number;
  category: string;
  loading: boolean;
  loadingAI: boolean;
  error: Record<string, string>;
  setOpen: (v: boolean) => void;
  setName: (v: string) => void;
  setDescription: (v: string) => void;
  setType: (v: string) => void;
  setPrice: (v: number) => void;
  setImages: (v: File[]) => void;
  setRemovedImages: (v: string[]) => void;

  setThumb: (v: number) => void;
  setCategory: (v: string) => void;
  setLoading: (v: boolean) => void;
  setLoadingAI: (v: boolean) => void;
  setError: (v: Record<string, string>) => void;
  reset: () => void;
  setProduct: (product: Article) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  productId: undefined,
  open: false,
  name: "",
  description: "",
  type: "",
  price: 0,
  images: [],
  removedImages: [],
  thumb: 0,
  category: "0",
  loading: false,
  loadingAI: false,
  error: {},
  setOpen: (v) => set({ open: v }),
  setName: (v) => set({ name: v }),
  setDescription: (v) => set({ description: v }),
  setType: (v) => set({ type: v }),
  setPrice: (v) => set({ price: v }),
  setImages: (v) => set({ images: v }),
  addRemovedImage: (image: string) =>
    set((state) => ({ removedImages: [...state.removedImages, image] })),

  setRemovedImages: (v) => set({ removedImages: v }),
  setThumb: (v) => set({ thumb: v }),
  setCategory: (v) => set({ category: v }),
  setLoading: (v) => set({ loading: v }),
  setLoadingAI: (v) => set({ loadingAI: v }),
  setError: (v) => set({ error: v }),
  reset: () =>
    set({
      productId: undefined,
      open: false,
      name: "",
      description: "",
      type: "",
      price: 0,
      images: [],
      removedImages: [],
      thumb: 0,
      category: "0",
      loading: false,
      loadingAI: false,
      error: {},
    }),
  setProduct: async (product) => {
    const images = product.imageUrls
      ? await urlsToFiles(product.imageUrls)
      : [];

    set({
      productId: Number(product.id),
      name: product.name,
      description: product.description,
      type: "0", //product.type,
      price: product.price,
      images,
      thumb: product.imageUrls?.indexOf(product.thumbnailUrl || "") || 0,
      category: product.categoryId || "0",
      open: true, // abrir modal al editar
    });
  },
}));

export const urlsToFiles = async (urls: string[]): Promise<File[]> => {
  const files: File[] = [];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const name = url.split("/").pop() || "image.jpg"; // obtener nombre del archivo
      const file = new File([blob], name, { type: blob.type });
      files.push(file);
    } catch (err) {
      console.error("No se pudo cargar la imagen desde la URL:", url, err);
    }
  }

  return files;
};
