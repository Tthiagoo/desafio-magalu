import { useMemo, useCallback } from "react";
import { useCartStore } from "../store/cart";

export function useProductQuantitySelector(product: any, restaurantInfo?: any) {
  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const setInfoRestaurant = useCartStore((s) => s.setInfoRestaurant);

  const cartItem = useMemo(
    () => items.find((item) => item.product.id === product.id),
    [items, product.id]
  );
  const quantity = cartItem?.quantity || 0;

  const updateCart = useCallback(
    (newQuantity: number) => {
      if (newQuantity === 0) {
        removeItem(product.id);
        return;
      }
      if (restaurantInfo) {
        setInfoRestaurant(restaurantInfo);
      }
      if (cartItem) {
        updateItem(product.id, {
          ...cartItem,
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
      cartItem,
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

  return {
    quantity,
    setProductQuantity: updateCart,
    total,
    increment,
    decrement,
  };
}
