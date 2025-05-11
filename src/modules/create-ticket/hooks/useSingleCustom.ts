import { useState, useEffect, useCallback, useMemo } from "react";
import {
  IProductCustomization,
  AppliedCustomizations,
  CustomizationOption,
} from "../types";
import {
  isAppliedCustomizations,
  useApplyCustomization,
  useCartProductItem,
} from ".";

export function useSingleCustomization(
  productId: string,
  customization: IProductCustomization
) {
  const item = useCartProductItem(productId);
  const applyCustomization = useApplyCustomization();

  const currentSelectedId = useMemo(() => {
    if (!isAppliedCustomizations(item?.customizations)) return undefined;
    const customizations = item?.customizations as AppliedCustomizations;
    const value = customizations[customization.id]?.value as
      | CustomizationOption
      | undefined;
    return value?.id;
  }, [item?.customizations, customization.id]);

  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(
    customization.options[0]?.id
  );

  useEffect(() => {
    const defaultOption = customization.options[0];
    if (!currentSelectedId && defaultOption) {
      applyCustomization(
        productId,
        customization.id,
        defaultOption,
        customization.title
      );
      setSelectedOptionId(defaultOption.id);
    } else if (currentSelectedId) {
      setSelectedOptionId(currentSelectedId);
    }
  }, [
    currentSelectedId,
    customization.options,
    customization.id,
    customization.title,
    productId,
    applyCustomization,
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
