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
