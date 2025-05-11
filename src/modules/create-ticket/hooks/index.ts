export * from "./useHeaderQuantityProduct";
export * from "./useMultiCustom";
export * from "./useQuantityCustom";
export * from "./useSingleCustom";

import { useCartStore } from "../store/cart";

import { CustomizationOption, AppliedCustomizations } from "../types";
import { useCallback } from "react";

export function useCartProductItem(productId: string) {
  return useCartStore(
    useCallback(
      (s) => s.items.find((item) => item.product.id === productId),
      [productId]
    )
  );
}

export function useApplyCustomization() {
  const updateItem = useCartStore((s) => s.updateItem);
  const item = useCartStore((s) => s.items);
  return (
    productId: string,
    customizationId: string,
    value:
      | CustomizationOption
      | CustomizationOption[]
      | Record<string, { label: string; quantity: number; price?: number }>,
    title: string
  ) => {
    const currentItem = item.find((i) => i.product.id === productId);
    if (!currentItem) return;
    // eslint-disable-next-line prefer-const
    let updatedProduct = { ...currentItem.product };

    if (
      (title.toLowerCase().includes("tamanho") ||
        title.toLowerCase().includes("size")) &&
      value &&
      typeof (value as CustomizationOption).price !== "undefined"
    ) {
      updatedProduct.price =
        (value as CustomizationOption).price ?? updatedProduct.price;
    }
    const customizations: AppliedCustomizations = {
      ...(isAppliedCustomizations(currentItem.customizations)
        ? (currentItem.customizations as AppliedCustomizations)
        : {}),
      [customizationId]: { value, title },
    };
    updateItem(productId, {
      ...currentItem,
      product: updatedProduct,
      customizations,
    });
  };
}

export function isAppliedCustomizations(
  obj: unknown
): obj is AppliedCustomizations {
  if (!obj || typeof obj !== "object") return false;
  return Object.values(obj).every(
    (entry) =>
      entry && typeof entry === "object" && "title" in entry && "value" in entry
  );
}
