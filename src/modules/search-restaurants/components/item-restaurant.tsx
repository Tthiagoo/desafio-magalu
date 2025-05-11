"use client";
import { Card } from "@/ui/card";
import React from "react";
import Image from "next/image";
import { Bike } from "lucide-react";

import { RestaurantEntity } from "../domain";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { useCartStore } from "@/modules/create-ticket/store/cart";
export default function ItemRestaurant({
  id,
  name,
  image,
  deliveryFee,
  rating,
  open,
}: RestaurantEntity) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const infoRestaurant = useCartStore((s) => s.infoRestaurant);
  const setInfoRestaurant = useCartStore((s) => s.setInfoRestaurant);

  return (
    <Card
      onClick={() => {
        if (!open) return;

        if (items.length > 0 && infoRestaurant && infoRestaurant.id !== id) {
          const confirmClear = window.confirm(
            "Você já possui itens no carrinho de outro restaurante. Deseja limpar o carrinho para escolher este restaurante?"
          );
          if (!confirmClear) return;
          clearCart();
        }

        router.push(`restaurant/${id}`);
      }}
      className={`flex flex-row gap-3 bg-neutral-100 p-0 rounded-lg h-full cursor-pointer ${
        !open ? "opacity-55 cursor-default" : ""
      }`}
    >
      <Image
        src={image}
        alt={name}
        width={72}
        height={72}
        className={`rounded-md `}
      />
      <div className="flex flex-col gap-1 justify-center">
        <h2 className="text-base font-bold text-neutral-700">{name}</h2>
        <div className="flex items-center flex-row gap-1">
          <span
            className={`flex items-center gap-1 font-bold text-sm ${
              deliveryFee === 0 ? "text-teal-600" : "text-purple-500"
            }`}
          >
            {deliveryFee === 0 ? (
              <Bike className="w-4 h-4" />
            ) : (
              <Image
                width={16}
                height={16}
                alt="icone delivery"
                src="/icons/notfree.svg"
              />
            )}
            {formatMoney(deliveryFee)}
          </span>
          <span className="text-sm text-neutral-500 font-bold">
            ⭐ {rating}
          </span>
        </div>
      </div>
    </Card>
  );
}
