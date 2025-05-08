import { Card } from "@/ui/card";
import React from "react";
import Image from "next/image";
import { Bike } from "lucide-react";
import { IProps } from "./list-restaurant";
import { RestaurantEntity } from "../domain";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils";
export default function ItemRestaurant({
  id,
  name,
  image,
  deliveryFee,
  rating,
}: RestaurantEntity) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`restaurant/${id}`)}
      className="flex flex-row gap-3 bg-neutral-100 p-0 rounded-lg h-full"
    >
      <Image src={image} alt={name} width={72} height={72} />
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
