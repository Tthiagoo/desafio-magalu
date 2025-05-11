import ProductCustomization from "@/modules/create-ticket/components/product-customization";
import ProductHeader from "@/modules/create-ticket/components/product-header";
import { serviceTicket } from "@/modules/create-ticket/service";
import React from "react";
import { Observation } from "@/modules/create-ticket/components/product-observation";
import ButtonTicket from "@/modules/create-ticket/components/button-ticket";

export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  const { getCustomizationByProductId } = serviceTicket(fetch);
  const customizationResponse = await getCustomizationByProductId(productId);

  return (
    <div className=" w-full items-center flex flex-col h-full  overflow-y-auto">
      <div className="flex-grow  max-w-[600px] w-full">
        <ProductHeader infoHeader={customizationResponse} />

        <ProductCustomization infoProduct={customizationResponse} />
      </div>
      <div className="px-4 mt-6 mb-12">
        <Observation productId={productId} />
      </div>
      <ButtonTicket productId={productId} />
    </div>
  );
}
