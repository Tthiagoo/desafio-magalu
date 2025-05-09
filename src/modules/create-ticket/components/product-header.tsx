"use client";

import React from "react";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import { ITicketEntity } from "../domain";
import { Button } from "@/ui/button";
import { QuantityCount } from "./quantity-count";
import { useCartStore } from "../store";

interface IProps {
  infoHeader: ITicketEntity;
}

export default function ProductHeader({ infoHeader }: IProps) {
  const { id: productId, inicialPrice } = infoHeader;

  const items = useCartStore((s) => s.items);

  const addToCart = useCartStore((s) => s.addToCart);
  const updateItemAtIndex = useCartStore((s) => s.updateItemInCart);

  const currentIndex = items.findIndex((item) => item.product.id === productId);
  const quantity = currentIndex !== -1 ? items[currentIndex].quantity : 0;

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    const cartItem = {
      product: infoHeader,
      quantity: newQuantity,
      customizations: {},
    };

    if (currentIndex === -1) {
      addToCart(cartItem);
    } else {
      updateItemAtIndex(currentIndex, cartItem);
    }
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      updateItemAtIndex(currentIndex, {
        product: infoHeader,
        quantity: 0,
        customizations: {},
      });
    } else {
      updateItemAtIndex(currentIndex, {
        product: infoHeader,
        quantity: quantity - 1,
        customizations: {},
      });
    }
  };

  return (
    <>
      <Image
        alt="imagem do prato"
        src={infoHeader.image}
        width={390}
        height={195}
      />
      <div className="px-4">
        <h1 className="mt-4 text-neutral-700 text-xl font-bold">
          {infoHeader.name}
        </h1>
        <div className="mt-1 font-extrabold">
          <span className="text-sm text-neutral-500">a partir de</span>
          <span className="text-lg font-extrabold ml-1 text-purple-500">
            {formatMoney(inicialPrice)}
          </span>
        </div>
        <p className="text-neutral-500 mt-1">{"sanduioche de frango"}</p>

        <div className="pt-2 mt-2 border-b-4 pb-5">
          <div className="flex h-12 items-center justify-between mt-1">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-md text-neutral-700">
                Quantos?
              </span>
              <span className="text-sm text-neutral-500 font-bold">
                Total
                <strong className="text-md ml-1 text-neutral-700">
                  {quantity
                    ? formatMoney(inicialPrice * quantity)
                    : formatMoney(inicialPrice)}
                </strong>
              </span>
            </div>

            {quantity === 0 ? (
              <Button onClick={handleIncrement}>adicionar</Button>
            ) : (
              <QuantityCount
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
