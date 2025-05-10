import { CartItem } from "@/modules/create-ticket/types";

export type CustomizationOptionDisplay = { title: string; value: string };

export function mapCustomizations(item: CartItem) {
  const customizationMap: Record<string, string[]> = {};
  if (item.customizations) {
    for (const custom of Object.values(item.customizations)) {
      if (
        !custom ||
        typeof custom !== "object" ||
        !("title" in custom && "value" in custom)
      )
        continue;
      const title = custom.title;
      const value = custom.value;
      let values: string[] = [];
      if (Array.isArray(value)) {
        values = value.map((opt) =>
          typeof opt === "object" && "label" in opt
            ? String(opt.label)
            : String(opt)
        );
      } else if (
        typeof value === "object" &&
        value !== null &&
        "label" in value
      ) {
        values = [String(value.label)];
      } else if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // quantity
        values = Object.values(value)
          .filter((v: any) => typeof v === "object" && v.quantity > 0)
          .map((v: any) =>
            v.price
              ? `${v.label} x${v.quantity} (+R$${v.price.toFixed(2)})`
              : `${v.label} x${v.quantity}`
          );
      } else if (value) {
        values = [String(value)];
      }
      if (values.length) {
        if (!customizationMap[title]) customizationMap[title] = [];
        customizationMap[title].push(...values);
      }
    }
  }
  const customizationOptions: CustomizationOptionDisplay[] = Object.entries(
    customizationMap
  ).map(([title, values]) => ({
    title,
    value: values.join(", "),
  }));
  const options: string[] = customizationOptions.map(
    (opt) => `${opt.title}: ${opt.value}`
  );
  return { customizationOptions, options };
}
