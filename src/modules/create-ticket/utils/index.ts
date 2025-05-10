import { CartItem } from "../types";
import { getCustomizationsTotal } from "./customization-total";

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const customTotal = getCustomizationsTotal(item);
    return total + item.product.inicialPrice * item.quantity + customTotal;
  }, 0);
}
