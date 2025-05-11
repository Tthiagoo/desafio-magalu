import { CartItem } from "../types";
import {
  getCustomizationsTotal,
  getSelectedSizePrice,
} from "./customization-total";

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const sizePrice = getSelectedSizePrice(item);
    const basePrice =
      typeof sizePrice === "number" ? sizePrice : item.product.price || 0;
    const customTotal = getCustomizationsTotal(item);
    return total + basePrice * item.quantity + customTotal;
  }, 0);
}
