import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  product: any; // Ajuste o tipo conforme seu domínio
  quantity: number;
  customizations?: Record<string, any>;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateItem: (productId: string, item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addToCart: (item) => {
        console.log("addToCart", item);
        set((state) => ({
          items: [...state.items, item],
        }));
      },
      updateItem: (productId, updatedItem) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...updatedItem } : item
          ),
        }));
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-store" }
  )
);
