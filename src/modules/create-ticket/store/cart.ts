import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CustomizationOption, CartItem } from "../types";
import { calculateCartTotal } from "../utils";

export interface CartState {
  items: CartItem[];
  addToCart: (newItem: CartItem) => void;
  updateItemInCart: (productId: string, updatedItem: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  applyCustomization: (
    productId: string,
    customizationId: string,
    value: CustomizationOption | CustomizationOption[] | Record<string, number>
  ) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (newItem) => {
        const items = get().items.slice();
        const existingIndex = items.findIndex(
          (item) => item.product.id === newItem.product.id
        );
        if (existingIndex !== -1) {
          items[existingIndex] = { ...newItem };
        } else {
          items.push(newItem);
        }
        set({ items });
      },
      updateItemInCart: (productId, updatedItem) => {
        const items = get().items.map((item) =>
          item.product.id === productId ? { ...updatedItem } : item
        );
        set({ items });
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.product.id !== productId),
        });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => calculateCartTotal(get().items),
      applyCustomization: (productId, customizationId, value) => {
        const items = get().items.map((item) => {
          if (item.product.id === productId) {
            return {
              ...item,
              customizations: {
                ...item.customizations,
                [customizationId]: value,
              },
            };
          }
          return item;
        });
        set({ items });
      },
    }),
    { name: "cart-storage" }
  )
);
