"use client";

import React from "react";
import { IProductCustomization } from "../types";
import { formatMoney } from "@/lib/utils";
import { QuantityCount } from "./quantity-count";
import { useQuantityCustomization } from "../hooks";

interface IProps {
  customization: IProductCustomization;
  productId: string;
}

export function QuantityCustom({ customization, productId }: IProps) {
  const { handleIncrement, handleDecrement, getQuantity } =
    useQuantityCustomization(productId, customization);

  return (
    <div className="pl-4 border-b-3 mt-3 pr-9 pb-3">
      {customization.options.map((option, index) => {
        const quantity = getQuantity(option.id);
        return (
          <div
            key={index}
            className="flex py-2 items-center my-1 justify-between"
          >
            <QuantityCount
              quantity={quantity}
              onIncrement={() => handleIncrement(option.id)}
              onDecrement={() => handleDecrement(option.id)}
            />
            <span className="text-neutral-500 flex-1 pl-1">{option.label}</span>
            <span className="text-purple-500 font-bold">
              +{formatMoney(option.price!)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
