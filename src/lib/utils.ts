import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatMoney(money: number): string {
  return money === 0 ? "grátis" : `R$${money?.toFixed(2)?.replace(".", ",")}`;
}
