import { Card } from "@/ui/card";
import React from "react";
import Image from "next/image";
import { Bike } from "lucide-react";
import { IProps, IRestaurant } from "./list-restaurant";
export default function ItemRestaurant({
  id,
  name,
  image,
  deliveryFee,
  rating,
}: IRestaurant) {
  return (
    <Card className="flex flex-row gap-3 w-full max-w-3xl bg-neutral-100 p-0 rounded-lg">
      <Image src={image} alt={name} width={72} height={72} />
      <div className="flex flex-col gap-1 my-2 ">
        <h2 className="text-base font-bold text-neutral-700">{name}</h2>
        <div className="flex items-center flex-row gap-1">
          <span
            className={`flex items-center flex-row gap-0.5 font-bold text-sm ${
              deliveryFee === 0 ? "text-teal-600" : "text-purple-500"
            }`}
          >
            {deliveryFee === 0 ? (
              <Bike />
            ) : (
              <Image
                width={24}
                height={24}
                alt="icone delivery"
                src="/icons/delivery.svg"
              />
            )}
            {deliveryFee === 0 ? "gratis" : `R$${deliveryFee}`}
          </span>

          <span className="text-base">
            ⭐
            <span className="font-bold text-sm text-neutral-500">{rating}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
