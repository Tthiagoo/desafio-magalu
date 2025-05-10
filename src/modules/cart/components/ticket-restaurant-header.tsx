"use client";
import React from "react";
import Image from "next/image";

export interface TicketRestaurantHeaderProps {
  restaurant: {
    name: string;
    image: string;
  };
}

export function TicketRestaurantHeader({
  restaurant,
}: TicketRestaurantHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        className="w-10 h-10 rounded object-cover"
        width={40}
        height={40}
      />
      <div>
        <div className="text-xs text-neutral-500">seus itens em</div>
        <div className="font-bold text-base text-neutral-800">
          {restaurant.name}
        </div>
      </div>
    </div>
  );
}
