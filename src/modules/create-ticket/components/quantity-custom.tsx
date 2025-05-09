"use client";

import React from "react";
import { IProductCustomization } from "../types";
import { formatMoney } from "@/lib/utils";
import { QuantityCount } from "./quantity-count";
import { useCartStore } from "../store";

interface IProps {
  customization: IProductCustomization;
  productId: string;
}

export function QuantityCustom({ customization, productId }: IProps) {
  const items = useCartStore((s) => s.items);
  const applyCustomization = useCartStore((s) => s.applyCustomization);

  const currentIndex = items.findIndex((item) => item.product.id === productId);
  const currentCustomizations =
    currentIndex !== -1 ? items[currentIndex].customizations : {};

  const handleIncrement = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id] as Record<string, number>) || {};
    const currentQuantity = quantityObj[optionId] || 0;
    const newQuantity = currentQuantity + 1;
    const updated = { ...quantityObj, [optionId]: newQuantity };
    applyCustomization(productId, customization.id, updated);
  };

  const handleDecrement = (optionId: string) => {
    const quantityObj =
      (currentCustomizations[customization.id] as Record<string, number>) || {};
    const currentQuantity = quantityObj[optionId] || 0;
    if (currentQuantity > 0) {
      const newQuantity = currentQuantity - 1;
      const updated = { ...quantityObj, [optionId]: newQuantity };
      applyCustomization(productId, customization.id, updated);
    }
  };

  return (
    <div className="pl-4 border-b-3 mt-3 pr-9 pb-3">
      {customization.options.map((option, index) => {
        const quantityObj =
          (currentCustomizations[customization.id] as Record<string, number>) ||
          {};
        const quantity = quantityObj[option.id] || 0;

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
