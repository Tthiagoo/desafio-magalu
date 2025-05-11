import { useCartStore } from "../store/cart";

import {
  CustomizationOption,
  IProductCustomization,
  AppliedCustomizations,
  AppliedCustomizationEntry,
} from "../types";
import { useCallback, useEffect, useState } from "react";

type CustomizationQuantityValue = Record<
  string,
  { label: string; quantity: number; price?: number }
>;

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

function isAppliedCustomizations(obj: unknown): obj is AppliedCustomizations {
  if (!obj || typeof obj !== "object") return false;
  return Object.values(obj).every(
    (entry) =>
      entry && typeof entry === "object" && "title" in entry && "value" in entry
  );
}

export function useSingleCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();
  const currentCustomizations: AppliedCustomizations = isAppliedCustomizations(
    item?.customizations
  )
    ? (item?.customizations as AppliedCustomizations)
    : {};
  const selectedOption = currentCustomizations[customization.id]?.value as
    | CustomizationOption
    | undefined;
  const handleChange = (label: string) => {
    const option = customization.options.find((o) => o.label === label);
    if (option) {
      applyCustomization(
        productId,
        customization.id,
        option,
        customization.title
      );
    }
  };
  return { selectedOption, handleChange };
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
    const customizations = isAppliedCustomizations(item?.customizations)
      ? (item?.customizations as AppliedCustomizations)
      : {};
    const currentValue = customizations[customization.id]?.value as
      | CustomizationOption
      | undefined;
    if (!currentValue && defaultOption) {
      applyCustomization(
        productId,
        customization.id,
        defaultOption,
        customization.title
      );
      setSelectedOptionId(defaultOption.id);
    } else if (currentValue && (currentValue as CustomizationOption).id) {
      setSelectedOptionId((currentValue as CustomizationOption).id);
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
  const currentCustomizations: AppliedCustomizations = isAppliedCustomizations(
    item?.customizations
  )
    ? (item?.customizations as AppliedCustomizations)
    : {};
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
  const currentCustomizations: AppliedCustomizations = isAppliedCustomizations(
    item?.customizations
  )
    ? (item?.customizations as AppliedCustomizations)
    : {};
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
