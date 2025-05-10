"use client";
import { formatMoney } from "@/lib/utils";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";
import React from "react";
import { IProductCustomization } from "../types";
import { useMultiCustomization } from "../hooks/useCustomizations";

interface IProps {
  productId: string;
  customization: IProductCustomization;
}

export function MultiCustom({ productId, customization }: IProps) {
  const { isOptionChecked, toggleOption } = useMultiCustomization(
    productId,
    customization
  );

  return (
    <div className="mt-4 flex-col gap-3 pl-4 pr-8 border-b-4 flex pb-4">
      {customization.options.map((item) => {
        const isChecked = isOptionChecked(item);

        return (
          <div className="space-x-1 items-center flex" key={item.id}>
            <Checkbox
              value={item.id}
              id={item.id}
              checked={isChecked}
              onCheckedChange={() => toggleOption(item)}
            />
            <Label
              htmlFor={item.id}
              className="flex gap-1 justify-between py-1 w-full"
            >
              <div className="text-neutral-500 items-center text-sm flex gap-1">
                <span>{item.label}</span>
              </div>
              <div className="text-purple-500 font-bold text-sm">
                {item.hasPromotion && (
                  <span className="text-xs mt-1 text-neutral-500 font-bold">
                    de {formatMoney(item.oldPrice!)} por{" "}
                  </span>
                )}
                {item.price! > 0 && (
                  <span className={item.hasPromotion ? "text-green-500" : ""}>
                    {formatMoney(item.price!)}
                  </span>
                )}
              </div>
            </Label>
          </div>
        );
      })}
    </div>
  );
}
