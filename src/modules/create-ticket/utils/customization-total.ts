import { CartItem } from "../types";

export function getCustomizationsTotal(item: CartItem): number {
  let customTotal = 0;
  for (const custom of Object.values(item.customizations)) {
    if (!custom || typeof custom !== "object" || !("value" in custom)) continue;
    const value = custom.value;
    if (Array.isArray(value)) {
      customTotal += value.reduce((s, o) => s + (o.price || 0), 0);
    } else if (
      typeof value === "object" &&
      value !== null &&
      "price" in value &&
      typeof value.price === "number"
    ) {
      customTotal += value.price;
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      for (const v of Object.values(value)) {
        if (typeof v === "object" && v.quantity > 0) {
          customTotal += (v.price || 0) * v.quantity;
        }
      }
    }
  }
  return customTotal;
}
