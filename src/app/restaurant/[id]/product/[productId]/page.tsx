import { formatMoney } from "@/lib/utils";
import ProductCustomization from "@/modules/create-ticket/components/product-customization";
import ProductHeader from "@/modules/create-ticket/components/product-header";
import { QuantityCount } from "@/modules/create-ticket/components/quantity-count";
import { serviceTicket } from "@/modules/create-ticket/service";
import { Button } from "@/ui/button";
import Image from "next/image";
import React from "react";

export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);
  const quantity = 1;
  const { getCustomizationByProductId } = serviceTicket(fetch);
  const customizationResponse = await getCustomizationByProductId(id);
  console.log(customizationResponse);
  return (
    <div className=" w-full items-center flex flex-col h-full overflow-y-auto">
      <div className="flex-grow  max-w-[620px] w-full">
        <ProductHeader infoHeader={customizationResponse} />

        <ProductCustomization infoProduct={customizationResponse} />
      </div>
    </div>
  );
}
