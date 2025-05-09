import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CustomizationOption, CartItem } from "../types";

export interface CartState {
  items: CartItem[];
  addToCart: (newItem: CartItem) => void;
  updateItemInCart: (index: number, updatedItem: CartItem) => void;
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
        const items = [...get().items];
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
      updateItemInCart: (index, updatedItem) => {
        const items = [...get().items];
        if (items[index]) {
          items[index] = { ...updatedItem };
          set({ items });
        }
      },
      removeItem: (productId) => {
        const items = get().items.filter(
          (item) => item.product.id !== productId
        );
        set({ items });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => {
          const customTotal = Object.entries(item.customizations).reduce(
            (sum, [customizationId, custom]) => {
              if (Array.isArray(custom)) {
                return sum + custom.reduce((s, o) => s + (o.price || 0), 0);
              }
              if (
                typeof custom === "object" &&
                custom !== null &&
                !Array.isArray(custom)
              ) {
                return (
                  sum +
                  Object.entries(custom).reduce((s, [optionId, qty]) => {
                    const customization = item.product.customization.find(
                      (c) => c.id === customizationId
                    );
                    const option = customization?.options.find(
                      (o) => o.id === optionId
                    );
                    return s + (option?.price || 0) * Number(qty);
                  }, 0)
                );
              }
              if (
                typeof custom === "object" &&
                custom !== null &&
                "price" in custom
              ) {
                return sum + (custom.price || 0);
              }
              return sum;
            },
            0
          );
          return (
            total + item.product.inicialPrice * item.quantity + customTotal
          );
        }, 0);
      },
      applyCustomization: (productId, customizationId, value) => {
        const items = [...get().items];
        const itemIndex = items.findIndex(
          (item) => item.product.id === productId
        );
        if (itemIndex !== -1) {
          const item = items[itemIndex];
          const updatedCustomizations = {
            ...item.customizations,
            [customizationId]: value,
          };
          items[itemIndex] = { ...item, customizations: updatedCustomizations };
          set({ items });
        }
      },
    }),
    { name: "cart-storage" }
  )
);
