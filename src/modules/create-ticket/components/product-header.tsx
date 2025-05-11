"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import { ITicketEntity } from "../domain";
import { Button } from "@/ui/button";
import { QuantityCount } from "./quantity-count";
import { useParams } from "next/navigation";
import { useCartStore } from "../store/cart";
import { useProductQuantitySelector } from "../hooks";

interface IProps {
  infoHeader: ITicketEntity;
}

export default function ProductHeader({ infoHeader }: IProps) {
  const params = useParams();
  const restaurantId = params.id;
  const restaurantInfo = {
    name: infoHeader.nameRestaurant,
    image: infoHeader.imageRestaurant,
    id: restaurantId,
  };

  const cartItem = useCartStore(
    useCallback(
      (s) => s.items.find((item) => item.product.id === infoHeader.id),
      [infoHeader.id]
    )
  );

  const currentPrice = cartItem?.product.price ?? infoHeader.price;

  const { quantity, setProductQuantity, increment, decrement } =
    useProductQuantitySelector(
      { ...infoHeader, price: currentPrice },
      restaurantInfo
    );
  return (
    <>
      <div className="w-full flex justify-center">
        <Image
          className=" sm:rounded-lg sm:mt-3"
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
            {formatMoney(currentPrice!)}
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
                    ? formatMoney(currentPrice! * quantity)
                    : formatMoney(currentPrice!)}
                </strong>
              </span>
              {quantity === 0 && (
                <span className="text-red-600 md:text-lg text-xs mt-1 font-semibold block">
                  Selecione pelo menos 1 quantidade
                </span>
              )}
            </div>

            {quantity === 0 ? (
              <Button onClick={() => setProductQuantity(1)}>adicionar</Button>
            ) : (
              <QuantityCount
                quantity={quantity}
                onIncrement={increment}
                onDecrement={decrement}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
