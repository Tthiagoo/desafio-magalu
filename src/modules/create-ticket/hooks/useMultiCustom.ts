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
