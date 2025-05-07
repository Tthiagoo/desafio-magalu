import { Card } from "@/ui/card";
import React from "react";
import Image from "next/image";
import { Bike } from "lucide-react";
export default function ItemRestaurant() {
  return (
    <Card className="flex flex-row gap-3 w-full max-w-3xl bg-neutral-100 p-0 rounded-lg">
      <Image
        src="/restaurantes-img/restaurante1.png"
        alt="Restaurant"
        width={72}
        height={72}
      />
      <div className="flex flex-col gap-1 my-2 ">
        <h2 className="text-base font-bold text-neutral-700">
          Matsuri Concept
        </h2>
        <div className="flex items-center flex-row gap-1">
          <span className="text-teal-600 flex items-center flex-row gap-1 font-bold text-sm">
            <Bike /> gratis
          </span>

          <span className="text-base">
            ⭐ <span className="font-bold text-sm text-neutral-500">4.7</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
