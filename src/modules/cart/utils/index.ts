import { CartItem } from "@/modules/create-ticket/types";
import { mapCustomizations } from "./customization-mapper";

export function MappedItems(items: CartItem[]) {
  return items.map((item) => {
    const { customizationOptions, options } = mapCustomizations(item);
    return {
      ...item,
      options: options.length > 0 ? options : undefined,
      customizationOptions:
        customizationOptions.length > 0 ? customizationOptions : undefined,
    };
  });
}
