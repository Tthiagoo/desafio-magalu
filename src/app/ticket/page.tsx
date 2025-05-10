"use client";
import React, { use } from "react";
import {
  TicketProductItem,
  TicketSummary,
  TicketRestaurantHeader,
} from "../../modules/cart/components";
import { useCartStore } from "@/modules/create-ticket/store/cart";

export default function Ticket() {
  const items = useCartStore((state) => state.items);

  const mappedItems = items.map((item) => {
    let options: string[] = [];
    if (item.customizations) {
      options = Object.values(item.customizations)
        .flatMap((custom) => {
          if (Array.isArray(custom)) {
            return custom.map((opt) =>
              typeof opt === "object" && "label" in opt
                ? String(opt.label)
                : String(opt)
            );
          }
          if (
            typeof custom === "object" &&
            custom !== null &&
            "label" in custom
          ) {
            return [String(custom.label)];
          }
          if (typeof custom === "object" && custom !== null) {
            return Object.entries(custom)
              .filter(([_, qty]) => qty > 0)
              .map(([label, qty]) => `${label} x${qty}`);
          }
          return [];
        })
        .filter((v): v is string => typeof v === "string" && v.length > 0);
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
    };
  });

  return (
    <div className="max-w-md mx-auto mt-4  px-2">
      <TicketRestaurantHeader />
      {mappedItems.map((product, i) => (
        <TicketProductItem key={i} {...product} />
      ))}
      <div className="h-24" />
      <TicketSummary
        subtotal={mappedItems.reduce(
          (acc, p) => acc + p.product.inicialPrice * p.quantity,
          0
        )}
      />
    </div>
  );
}
