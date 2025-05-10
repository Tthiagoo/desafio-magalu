"use client";

import React from "react";
import Image from "next/image";
import { formatMoney } from "@/lib/utils";
import { ITicketEntity } from "../domain";
import { Button } from "@/ui/button";
import { QuantityCount } from "./quantity-count";
import { useProductHeader } from "../hooks/useCustomizations";

interface IProps {
  infoHeader: ITicketEntity;
}

export default function ProductHeader({ infoHeader }: IProps) {
  const { quantity, handleIncrement, handleDecrement } =
    useProductHeader(infoHeader);
  const { inicialPrice } = infoHeader;

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
            {formatMoney(inicialPrice)}
          </span>
        </div>

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
