"use client";
import React from "react";
import {
  TicketProductItem,
  TicketSummary,
  TicketRestaurantHeader,
} from "../../modules/cart/components";
import { useCartStore } from "@/modules/create-ticket/store/cart";
import Link from "next/link";

import { calculateCartTotal } from "@/modules/create-ticket/utils";
import CartEmpty from "@/modules/cart/components/cart-empty";

export default function Ticket() {
  const items = useCartStore((state) => state.items);
  console.log("items", items);
  const isEmpty = items.length === 0;
  return (
    <div className="max-w-md mx-auto mt-4  px-2">
      {isEmpty ? (
        <CartEmpty />
      ) : (
        <>
          <TicketRestaurantHeader />
          {items.map((product, i) => (
            <TicketProductItem
              key={i}
              product={product}
              quantity={product.quantity}
              options={product.customizations}
            />
          ))}
        </>
      )}
      <div className="h-24" />
      {/* <TicketSummary subtotal={calculateCartTotal(items)} /> */}
    </div>
  );
}
