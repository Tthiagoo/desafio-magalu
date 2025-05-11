import { useState, useEffect, useCallback } from "react";
import { useCartStore } from "../store/cart";

export function useProductQuantitySelector(product: any, restaurantInfo?: any) {
  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const setInfoRestaurant = useCartStore((s) => s.setInfoRestaurant);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const item = items.find((item) => item.product.id === product.id);
    if (item) {
      setQuantity(item.quantity);
    } else {
      setQuantity(0);
    }
  }, [items, product.id]);

  const updateCart = useCallback(
    (newQuantity: number) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (newQuantity === 0) {
        setQuantity(0);
        removeItem(product.id);
        return;
      }
      setQuantity(newQuantity);
      if (restaurantInfo) {
        setInfoRestaurant(restaurantInfo);
      }
      if (existingItem) {
        updateItem(product.id, {
          ...existingItem,
          quantity: newQuantity,
        });
      } else {
        addToCart({
          product,
          quantity: newQuantity,
          customizations: {},
        });
      }
    },
    [
      addToCart,
      updateItem,
      removeItem,
      setInfoRestaurant,
      product,
      restaurantInfo,
      items,
    ]
  );

  const increment = useCallback(() => {
    updateCart(quantity + 1);
  }, [quantity, updateCart]);

  const decrement = useCallback(() => {
    if (quantity > 0) {
      updateCart(quantity - 1);
    }
  }, [quantity, updateCart]);

  const total = (quantity * (product.price || 0) || 0)
    .toFixed(2)
    .replace(".", ",");

  return { quantity, setQuantity: updateCart, total, increment, decrement };
}
