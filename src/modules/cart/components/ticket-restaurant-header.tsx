"use client";
import React from "react";
import Image from "next/image";
import { useCartStore } from "../../create-ticket/store/cart";

export function TicketRestaurantHeader() {
  const storeRestaurant = useCartStore((state) => state.restaurant);

  const data = storeRestaurant;
  return (
    <div className="flex items-center gap-3 mb-4">
      <Image
        src={data!.image}
        alt={data!.name}
        className="w-10 h-10 rounded object-cover"
        width={40}
        height={40}
      />
      <div>
        <div className="text-xs text-neutral-500">seus itens em</div>
        <div className="font-bold text-base text-neutral-800">{data!.name}</div>
      </div>
    </div>
  );
}
