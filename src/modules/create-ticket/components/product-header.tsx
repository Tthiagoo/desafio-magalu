"use client";

import React from "react";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import { ITicketEntity } from "../domain";
import { Button } from "@/ui/button";
import { QuantityCount } from "./quantity-count";
import { useProductQuantitySelector } from "../hooks/useCustomizations";
import { useCartStore } from "../store/cart";

interface IProps {
  infoHeader: ITicketEntity;
}

export default function ProductHeader({ infoHeader }: IProps) {
  console.log("infoHeader", infoHeader);

  const restaurantInfo = {
    name: infoHeader.nameRestaurant,
    image: infoHeader.imageRestaurant,
  };
  const { quantity, setQuantity, total } = useProductQuantitySelector(
    infoHeader,
    restaurantInfo
  );

  return (
    <>
      <div className="w-full flex justify-center">
        <Image
          className=" sm:rounded-lg"
          alt="imagem do prato"
          src={infoHeader.image}
          width={390}
          height={195}
        />
      </div>
      <div className="px-4">
        <h1 className="mt-4 text-neutral-700 text-xl font-bold">
          {infoHeader.name}
        </h1>
        <div className="mt-1 font-extrabold">
          <span className="text-sm text-neutral-500">a partir de</span>
          <span className="text-lg font-extrabold ml-1 text-purple-500">
            {formatMoney(infoHeader.price!)}
          </span>
        </div>
        <span className="text-sm text-neutral-500">
          {infoHeader.description}
        </span>
        <div className="pt-2 mt-2 border-b-4 pb-5">
          <div className="flex h-12 items-center justify-between mt-1">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md text-neutral-700">
                Quantos?
              </span>
              <span className="text-sm text-neutral-500 font-bold">
                Total
                <strong className="text-md ml-1 text-neutral-700">
                  {quantity > 0
                    ? formatMoney(infoHeader.price! * quantity)
                    : formatMoney(infoHeader.price!)}
                </strong>
              </span>
            </div>

            {quantity === 0 ? (
              <Button onClick={() => setQuantity(1)}>adicionar</Button>
            ) : (
              <QuantityCount
                quantity={quantity}
                onIncrement={() => setQuantity(quantity + 1)}
                onDecrement={() => setQuantity(quantity - 1)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
