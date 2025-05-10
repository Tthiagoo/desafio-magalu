import { ITicketEntity } from "../domain";
import { useCartStore } from "../store";
import { CustomizationOption, IProductCustomization } from "../types";
import { useCallback, useEffect } from "react";

function useCartProductItem(productId: string) {
  return useCartStore(
    useCallback(
      (s) => s.items.find((item) => item.product.id === productId),
      [productId]
    )
  );
}

function useApplyCustomization() {
  return useCartStore((s) => s.applyCustomization);
}

export function useSingleCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();

  useEffect(() => {
    console.log("[useSingleCustomization] render", { productId, item });
  });

  const currentCustomizations = item?.customizations || {};
  const selectedOption = currentCustomizations[customization.id] as
    | CustomizationOption
    | undefined;

  const handleChange = (label: string) => {
    const option = customization.options.find((o) => o.label === label);
    if (option) {
      applyCustomization(productId, customization.id, option);
    }
  };

  return { selectedOption, handleChange };
}

export function useMultiCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();

  useEffect(() => {
    console.log("[useMultiCustomization] render", { productId, item });
  });

  const currentCustomizations = item?.customizations || {};
  const currentOptions: CustomizationOption[] = Array.isArray(
    currentCustomizations[customization.id]
  )
    ? (currentCustomizations[customization.id] as CustomizationOption[])
    : [];

  const isOptionChecked = (option: CustomizationOption) =>
    currentOptions.some((opt) => opt.id === option.id);

  const toggleOption = (option: CustomizationOption) => {
    let updatedOptions: CustomizationOption[] = [];
    if (isOptionChecked(option)) {
      updatedOptions = currentOptions.filter((opt) => opt.id !== option.id);
    } else {
      updatedOptions = [...currentOptions, option];
    }
    applyCustomization(productId, customization.id, updatedOptions);
  };

  return { isOptionChecked, toggleOption };
}

export function useQuantityCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();

  useEffect(() => {
    console.log("[useQuantityCustomization] render", { productId, item });
  });

  const currentCustomizations = item?.customizations || {};

  const handleIncrement = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id] as Record<string, number>) || {};
    const currentQuantity = quantityObj[optionId] || 0;
    const newQuantity = currentQuantity + 1;
    const updated = { ...quantityObj, [optionId]: newQuantity };
    applyCustomization(productId, customization.id, updated);
  };

  const handleDecrement = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id] as Record<string, number>) || {};
    const currentQuantity = quantityObj[optionId] || 0;
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      const updated = { ...quantityObj, [optionId]: newQuantity };
      applyCustomization(productId, customization.id, updated);
    }
  };

  const getQuantity = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id] as Record<string, number>) || {};
    return quantityObj[optionId] || 0;
  };

  return { handleIncrement, handleDecrement, getQuantity };
}

export function useProductHeader(infoHeader: ITicketEntity) {
  const { id: productId } = infoHeader;
  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateItemInCart = useCartStore((s) => s.updateItemInCart);

  const currentItem = items.find((item) => item.product.id === productId);
  const quantity = currentItem ? currentItem.quantity : 0;

  const handleIncrement = useCallback(() => {
    const newQuantity = quantity + 1;
    const currentCustomizations = currentItem ? currentItem.customizations : {};
    const cartItem = {
      product: infoHeader,
      quantity: newQuantity,
      customizations: currentCustomizations,
    };
    if (!currentItem) {
      addToCart(cartItem);
    } else {
      updateItemInCart(productId, cartItem);
    }
  }, [
    quantity,
    currentItem,
    infoHeader,
    addToCart,
    updateItemInCart,
    productId,
  ]);

  const handleDecrement = useCallback(() => {
    if (quantity <= 1) {
      updateItemInCart(productId, {
        product: infoHeader,
        quantity: 0,
        customizations: {},
      });
    } else {
      const currentCustomizations = currentItem
        ? currentItem.customizations
        : {};
      updateItemInCart(productId, {
        product: infoHeader,
        quantity: quantity - 1,
        customizations: currentCustomizations,
      });
    }
  }, [quantity, currentItem, infoHeader, updateItemInCart, productId]);

  return { quantity, handleIncrement, handleDecrement };
}
