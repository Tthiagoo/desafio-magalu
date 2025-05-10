import { CartItem } from "@/modules/create-ticket/types";

export function MappedItems(items: CartItem[]) {
  const mappedItems = items.map((item: CartItem) => {
    let customizationOptions: { title: string; value: string }[] = [];
    let options: string[] = [];
    if (item.customizations) {
      customizationOptions = Object.values(item.customizations).flatMap(
        (custom: CartItem["customizations"][number]) => {
          if (
            !custom ||
            typeof custom !== "object" ||
            !("title" in custom && "value" in custom)
          )
            return [];
          const title = custom.title;
          const value = custom.value;
          // SINGLE ou MULTI
          if (Array.isArray(value)) {
            return value.map((opt) => ({
              title,
              value:
                typeof opt === "object" && "label" in opt
                  ? String(opt.label)
                  : String(opt),
            }));
          }
          if (typeof value === "object" && value !== null && "label" in value) {
            return [{ title, value: String(value.label) }];
          }
          // QUANTITY
          if (
            typeof value === "object" &&
            value !== null &&
            !Array.isArray(value)
          ) {
            return Object.values(value)
              .filter((v: any) => typeof v === "object" && v.quantity > 0)
              .map((v: any) => ({
                title,
                value: v.price
                  ? `${v.label} x${v.quantity} (+R$${v.price.toFixed(2)})`
                  : `${v.label} x${v.quantity}`,
              }));
          }

          return [{ title, value: String(value) }];
        }
      );

      const grouped: Record<string, string[]> = {};
      customizationOptions.forEach(({ title, value }) => {
        if (!grouped[title]) grouped[title] = [];
        grouped[title].push(value);
      });
      customizationOptions = Object.entries(grouped).map(([title, values]) => ({
        title,
        value: values.join(", "),
      }));
      options = customizationOptions.map((opt) => `${opt.title}: ${opt.value}`);
    }
    const prod = item.product as any;
    return {
      ...item,
      id: prod.id,
      productId: prod.productId,
      idRestaurant: prod.idRestaurant,
      imageRestaurant: prod.imageRestaurant,
      nameRestaurant: prod.nameRestaurant,
      options: options.length > 0 ? options : undefined,
      customizationOptions:
        customizationOptions.length > 0 ? customizationOptions : undefined,
    };
  });
  return mappedItems;
}
