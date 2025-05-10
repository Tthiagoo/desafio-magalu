"use client";
import { formatMoney } from "@/lib/utils";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { IProductCustomization } from "../types";
import React from "react";
import { useSingleCustomizationV2 } from "../hooks/useCustomizations";

interface IProps {
  productId: string;
  customization: IProductCustomization;
}

export function SingleCustom({ productId, customization }: IProps) {
  const { selectedOptionId, handleSelectOption } = useSingleCustomizationV2(
    productId,
    customization
  );

  return (
    <div className="pr-8 border-b-4 pl-4 mt-4 pb-4">
      <RadioGroup
        value={selectedOptionId}
        onValueChange={handleSelectOption}
        className="space-y-3"
      >
        {customization.options.map((item, index) => (
          <div className="space-x-2 flex items-center" key={index}>
            <RadioGroupItem
              id={`${customization.id}-${index}`}
              value={item.id}
            />
            <Label
              className="flex justify-between w-full"
              htmlFor={`${customization.id}-${index}`}
            >
              <div className="text-neutral-500 gap-1 text-sm flex items-center">
                <span>{item.label}</span>
              </div>
              <div className="text-purple-500 font-bold text-sm">
                {item.hasPromotion && (
                  <span className="text-xs font-bold mt-1 text-neutral-500">
                    de {formatMoney(item.oldPrice!)} por{" "}
                  </span>
                )}
                <span className={item.hasPromotion ? "text-green-500" : ""}>
                  {formatMoney(item.price!)}
                </span>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
