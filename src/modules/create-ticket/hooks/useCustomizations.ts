import { useCartStore } from "../store/cart";

import { CustomizationOption, IProductCustomization } from "../types";
import { useCallback, useEffect, useState } from "react";

function useCartProductItem(productId: string) {
  return useCartStore(
    useCallback(
      (s) => s.items.find((item) => item.product.id === productId),
      [productId]
    )
  );
}

function useApplyCustomization() {
  const updateItem = useCartStore((s) => s.updateItem);
  const item = useCartStore((s) => s.items);
  return (
    productId: string,
    customizationId: string,
    value: any,
    title: string
  ) => {
    const currentItem = item.find((i) => i.product.id === productId);
    if (!currentItem) return;
    let updatedProduct = { ...currentItem.product };
    // Se for a customização de tamanho, atualiza o preço do produto
    if (title.toLowerCase() === "tamanho" && value && value.price) {
      updatedProduct.price = value.price;
    }
    const customizations = {
      ...currentItem.customizations,
      [customizationId]: { value, title },
    };
    updateItem(productId, {
      ...currentItem,
      product: updatedProduct,
      customizations,
    });
  };
}

export function useSingleCustomizationV2(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    customization.options[0]?.id
  );

  useEffect(() => {
    // Usa apenas a primeira opção como default
    const defaultOption = customization.options[0];
    const currentValue = item?.customizations?.[customization.id]?.value;
    if (!currentValue && defaultOption) {
      applyCustomization(
        productId,
        customization.id,
        defaultOption,
        customization.title
      );
      setSelectedOptionId(defaultOption.id);
    } else if (currentValue && currentValue.id) {
      setSelectedOptionId(currentValue.id);
    }
  }, [
    item,
    customization.id,
    customization.options,
    customization.title,
    productId,
  ]);

  const handleSelectOption = useCallback(
    (optionId: string) => {
      setSelectedOptionId(optionId);
      const option = customization.options.find((opt) => opt.id === optionId);
      if (option) {
        applyCustomization(
          productId,
          customization.id,
          option,
          customization.title
        );
      }
    },
    [applyCustomization, customization, productId]
  );

  return { selectedOptionId, handleSelectOption };
}

export function useMultiCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();
  const currentCustomizations = item?.customizations || {};
  const currentOptions: CustomizationOption[] = Array.isArray(
    currentCustomizations[customization.id]?.value
  )
    ? (currentCustomizations[customization.id]?.value as CustomizationOption[])
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
    applyCustomization(
      productId,
      customization.id,
      updatedOptions,
      customization.title
    );
  };
  return { isOptionChecked, toggleOption };
}

export function useQuantityCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();
  const currentCustomizations = item?.customizations || {};
  const handleIncrement = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id]?.value as Record<
        string,
        { label: string; quantity: number; price?: number }
      >) || {};
    const current = quantityObj[optionId]?.quantity || 0;
    const option = customization.options.find((o) => o.id === optionId);
    if (!option) return;
    const updated = {
      ...quantityObj,
      [optionId]: {
        label: option.label,
        quantity: current + 1,
        price: option.price,
      },
    };
    applyCustomization(
      productId,
      customization.id,
      updated,
      customization.title
    );
  };
  const handleDecrement = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id]?.value as Record<
        string,
        { label: string; quantity: number; price?: number }
      >) || {};
    const current = quantityObj[optionId]?.quantity || 0;
    const option = customization.options.find((o) => o.id === optionId);
    if (!option || current <= 0) return;
    const updated = {
      ...quantityObj,
      [optionId]: {
        label: option.label,
        quantity: current - 1,
        price: option.price,
      },
    };
    applyCustomization(
      productId,
      customization.id,
      updated,
      customization.title
    );
  };
  const getQuantity = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id]?.value as Record<
        string,
        { label: string; quantity: number }
      >) || {};
    return quantityObj[optionId]?.quantity || 0;
  };
  return { handleIncrement, handleDecrement, getQuantity };
}

export function useProductHeader(infoHeader: any) {
  const { id: productId } = infoHeader;
  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const currentItem = items.find((item) => item.product.id === productId);
  const quantity = currentItem ? currentItem.quantity : 0;
  const handleIncrement = useCallback(() => {
    const newQuantity = quantity + 1;
    console.log(infoHeader);
    const cartItem = {
      product: infoHeader,
      quantity: newQuantity,
    };
    if (!currentItem) {
      addToCart(cartItem);
    } else {
      updateItem(productId, cartItem);
    }
  }, [quantity, currentItem, infoHeader, addToCart, updateItem, productId]);
  const handleDecrement = useCallback(() => {
    if (quantity <= 1) {
      // Remover o item do carrinho ao invés de zerar
      removeItem(productId);
    } else {
      const currentCustomizations = currentItem
        ? currentItem.customizations
        : {};
      updateItem(productId, {
        product: infoHeader,
        quantity: quantity - 1,
        customizations: currentCustomizations,
      });
    }
  }, [quantity, currentItem, infoHeader, updateItem, removeItem, productId]);
  return { quantity, handleIncrement, handleDecrement };
}

export function useProductQuantitySelector(product: any, restaurantInfo?: any) {
  const items = useCartStore((s) => s.items);
  const addToCart = useCartStore((s) => s.addToCart);
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
      if (newQuantity === 0) {
        setQuantity(0);
        removeItem(product.id);
        return;
      }
      setQuantity(newQuantity);
      if (restaurantInfo) {
        setInfoRestaurant(restaurantInfo);
      }
      addToCart({
        product,
        quantity: newQuantity,
        customizations: {},
      });
    },
    [addToCart, removeItem, setInfoRestaurant, product, restaurantInfo]
  );

  const total = (quantity * (product.price || 0) || 0)
    .toFixed(2)
    .replace(".", ",");

  return { quantity, setQuantity: updateCart, total };
}
