import { RestaurantEntity } from "@/modules/search-restaurants/domain";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
  customizations?: Record<string, unknown>;
  observation?: string;
}

interface CartState {
  items: CartItem[];
  infoRestaurant: RestaurantEntity;
  addToCart: (item: CartItem) => void;
  updateItem: (productId: string, item: CartItem) => void;
  updateItemInCart: (productId: string, item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  setInfoRestaurant: (restaurantInfo: RestaurantEntity) => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set) => ({
      items: [],
      infoRestaurant: {} as RestaurantEntity,
      addToCart: (item) => {
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
      updateItemInCart: (productId, updatedItem) => {
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
      clearCart: () => {
        set({ items: [] });
        set({ infoRestaurant: {} as RestaurantEntity });
      },
      setInfoRestaurant: (restaurantInfo) => {
        set({ infoRestaurant: restaurantInfo });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
