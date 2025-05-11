import { useMemo, useCallback } from "react";
import {
  isAppliedCustomizations,
  useApplyCustomization,
  useCartProductItem,
} from ".";
import {
  IProductCustomization,
  AppliedCustomizations,
  CustomizationOption,
} from "../types";

export function useMultiCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();

  const currentOptions: CustomizationOption[] = useMemo(() => {
    if (!isAppliedCustomizations(item?.customizations)) return [];
    const value = (item?.customizations as AppliedCustomizations)[
      customization.id
    ]?.value;
    return Array.isArray(value) ? (value as CustomizationOption[]) : [];
  }, [item?.customizations, customization.id]);

  const isOptionChecked = useCallback(
    (option: CustomizationOption) =>
      currentOptions.some((opt) => opt.id === option.id),
    [currentOptions]
  );

  const toggleOption = useCallback(
    (option: CustomizationOption) => {
      const updatedOptions = isOptionChecked(option)
        ? currentOptions.filter((opt) => opt.id !== option.id)
        : [...currentOptions, option];
      applyCustomization(
        productId,
        customization.id,
        updatedOptions,
        customization.title
      );
    },
    [
      isOptionChecked,
      currentOptions,
      applyCustomization,
      productId,
      customization.id,
      customization.title,
    ]
  );

  return { isOptionChecked, toggleOption };
}
