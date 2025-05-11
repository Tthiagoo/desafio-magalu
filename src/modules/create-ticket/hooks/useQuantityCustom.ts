import { useMemo, useCallback } from "react";
import {
  isAppliedCustomizations,
  useApplyCustomization,
  useCartProductItem,
} from ".";
import { IProductCustomization, AppliedCustomizations } from "../types";

export function useQuantityCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();

  const quantityObj = useMemo(() => {
    if (!isAppliedCustomizations(item?.customizations)) return {};
    const value = (item?.customizations as AppliedCustomizations)[
      customization.id
    ]?.value;
    return (
      (value as Record<
        string,
        { label: string; quantity: number; price?: number }
      >) || {}
    );
  }, [item?.customizations, customization.id]);

  const handleIncrement = useCallback(
    (optionId: string) => {
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
    },
    [
      quantityObj,
      customization.options,
      applyCustomization,
      productId,
      customization.id,
      customization.title,
    ]
  );

  const handleDecrement = useCallback(
    (optionId: string) => {
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
    },
    [
      quantityObj,
      customization.options,
      applyCustomization,
      productId,
      customization.id,
      customization.title,
    ]
  );

  const getQuantity = useCallback(
    (optionId: string) => quantityObj[optionId]?.quantity || 0,
    [quantityObj]
  );

  return { handleIncrement, handleDecrement, getQuantity };
}
