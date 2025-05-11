import { useState, useEffect, useCallback } from "react";
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
