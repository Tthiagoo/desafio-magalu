import { Badge } from "@/ui/badge";
import React from "react";

import { IProductCustomization } from "../types";
interface IProps {
  customization: IProductCustomization;
}
export function ProductTitleCustomization({ customization }: IProps) {
  return (
    <div className="text-md mb-2 flex mt-2  px-4 font-bold justify-between">
      <div className="flex   flex-col">
        <span>{customization.title}</span>
        <span className="text-xs text-neutral-500">
          {customization.description}
        </span>
      </div>
      {customization.required && (
        <Badge className="max-h-8 bg-neutral-700">obrigatório</Badge>
      )}
    </div>
  );
}
