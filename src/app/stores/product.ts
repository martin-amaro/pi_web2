import { Article } from "@/app/libs/definitions";
import { create } from "zustand";

type ProductStore = {
  productId?: number;
  open: boolean;
  name: string;
  description: string;
  type: string;
  active: boolean;
  price: number;
  images: (File | string)[];
  newImages: File[];
  removedImages: string[];
  thumb: number;
  category: string;
  loading: boolean;
  loadingAI: boolean;
  error: Record<string, string>;
  preview: boolean;

  setOpen: (v: boolean) => void;
  setPreview: (v: boolean) => void;
  setName: (v: string) => void;
  setDescription: (v: string) => void;
  setType: (v: string) => void;
  setActive: (v: boolean) => void;
  setPrice: (v: number) => void;
  setCategory: (v: string) => void;
  setThumb: (v: number) => void;
  setLoading: (v: boolean) => void;
  setLoadingAI: (v: boolean) => void;
  setError: (v: Record<string, string>) => void;

  addNewImage: (file: File) => void;
  removeImage: (index: number) => void;
  setProduct: (product: Article, preview?: boolean) => void;
  reset: () => void;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  productId: undefined,
  open: false,
  preview: false,
  name: "",
  description: "",
  type: "",
  price: 0,
  active: true,
  images: [],
  newImages: [],
  removedImages: [],
  thumb: 0,
  category: "0",
  loading: false,
  loadingAI: false,
  error: {},

  setOpen: (v) => set({ open: v }),
  setPreview: (v) => set({ preview: v }),
  setName: (v) => set({ name: v }),
  setDescription: (v) => set({ description: v }),
  setType: (v) => set({ type: v }),
  setActive: (v) => set({ active: v }),
  setPrice: (v) => set({ price: v }),
  setCategory: (v) => set({ category: v }),
  setThumb: (v) => set({ thumb: v }),
  setLoading: (v) => set({ loading: v }),
  setLoadingAI: (v) => set({ loadingAI: v }),
  setError: (v) => set({ error: v }),

  addNewImage: (file) =>
    set((state) => ({
      images: [...state.images, file],
      newImages: [...state.newImages, file],
    })),

  removeImage: (index) =>
    set((state) => {
      const removed = state.images[index];
      let removedImages = [...state.removedImages];
      let newImages = [...state.newImages];

      // Si la imagen era una URL, la marcamos para eliminar.
      if (typeof removed === "string") {
        removedImages.push(removed);
      } else {
        // Si era un File, la quitamos de las nuevas.
        newImages = newImages.filter((f) => f !== removed);
      }

      // Si borramos el thumbnail, reiniciamos a 0
      const newThumb =
        index === state.thumb
          ? 0
          : Math.max(0, state.thumb - (index < state.thumb ? 1 : 0));

      return {
        images: state.images.filter((_, i) => i !== index),
        removedImages,
        newImages,
        thumb: newThumb,
      };
    }),

  reset: () =>
    set({
      productId: undefined,
      open: false,
      name: "",
      description: "",
      type: "",
      price: 0,
      images: [],
      newImages: [],
      removedImages: [],
      thumb: 0,
      category: "0",
      loading: false,
      loadingAI: false,
      error: {},
    }),

  setProduct: async (product, showPreview = false) => {
    const urls = product.imageUrls || [];
    set({
      productId: Number(product.id),
      name: product.name,
      description: product.description,
      type: "0",
      price: product.price,
      images: urls, // guardamos como strings
      newImages: [],
      removedImages: [],
      thumb: Math.max(0, urls.indexOf(product.thumbnailUrl || "")),
      category: product.categoryId?.toString() || "0",
      open: true && !showPreview,
      preview: true && showPreview,
      active: product.active,
    });
  },
}));
