import { CartItem } from "../types";

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const customTotal = Object.entries(item.customizations).reduce(
      (sum, [customizationId, custom]) => {
        if (Array.isArray(custom)) {
          return sum + custom.reduce((s, o) => s + (o.price || 0), 0);
        }
        if (
          typeof custom === "object" &&
          custom !== null &&
          !Array.isArray(custom)
        ) {
          return (
            sum +
            Object.entries(custom).reduce((s, [optionId, qty]) => {
              const customization = item.product.customization.find(
                (c) => c.id === customizationId
              );
              const option = customization?.options.find(
                (o) => o.id === optionId
              );
              return s + (option?.price || 0) * Number(qty);
            }, 0)
          );
        }
        if (
          typeof custom === "object" &&
          custom !== null &&
          "price" in custom
        ) {
          return sum + (custom.price || 0);
        }
        return sum;
      },
      0
    );
    return total + item.product.inicialPrice * item.quantity + customTotal;
  }, 0);
}
