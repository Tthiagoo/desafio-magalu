"use client";
import React from "react";
import { ProductTitleCustomization } from "./product-title-customization";
import { SingleCustom } from "./single-custom";
import { MultiCustom } from "./multi-custom";
import { ITicketEntity } from "../domain";
import { QuantityCustom } from "./quantity-custom";
interface IProps {
  infoProduct: ITicketEntity;
}

export default function ProductCustomization({ infoProduct }: IProps) {
  return (
    <>
      {infoProduct.customization.map((customCategory, index: number) => (
        <div key={index}>
          <ProductTitleCustomization customization={customCategory} />
          {customCategory.type === "single" && (
            <SingleCustom
              customization={customCategory}
              productId={infoProduct.id}
            />
          )}
          {customCategory.type === "multi" && (
            <MultiCustom
              customization={customCategory}
              productId={infoProduct.id}
            />
          )}
          {customCategory.type === "quantity" && (
            <QuantityCustom
              customization={customCategory}
              productId={infoProduct.id}
            />
          )}
        </div>
      ))}
    </>
  );
}
