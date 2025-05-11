import { CartItem } from "../types";

function getSelectedSizePrice(item: CartItem): number | undefined {
  for (const custom of Object.values(item.customizations)) {
    if (!custom || typeof custom !== "object" || !("value" in custom)) continue;

    if (
      custom.title &&
      typeof custom.title === "string" &&
      (custom.title.toLowerCase().includes("tamanho") ||
        custom.title.toLowerCase().includes("size"))
    ) {
      const value = custom.value;
      if (Array.isArray(value)) {
        const found = value.find(
          (v) => typeof v === "object" && typeof v.price === "number"
        );
        if (found) return found.price;
      } else if (
        typeof value === "object" &&
        value !== null &&
        "price" in value &&
        typeof value.price === "number"
      ) {
        return value.price;
      }
    }
  }
  return undefined;
}

export function getCustomizationsTotal(item: CartItem): number {
  let customTotal = 0;
  for (const custom of Object.values(item.customizations)) {
    if (!custom || typeof custom !== "object" || !("value" in custom)) continue;

    if (
      custom.title &&
      typeof custom.title === "string" &&
      (custom.title.toLowerCase().includes("tamanho") ||
        custom.title.toLowerCase().includes("size"))
    ) {
      continue;
    }
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

export { getSelectedSizePrice };
