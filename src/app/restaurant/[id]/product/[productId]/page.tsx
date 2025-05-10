import ProductCustomization from "@/modules/create-ticket/components/product-customization";
import ProductHeader from "@/modules/create-ticket/components/product-header";
import { serviceTicket } from "@/modules/create-ticket/service";
import { Button } from "@/ui/button";
import React from "react";
import { Observation } from "@/modules/create-ticket/components/product-observation";
import Link from "next/link";

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
      <Link href={`/ticket`}>
        <Button className="w-full max-w-[620px] mt-4">ver ticket</Button>
      </Link>
    </div>
  );
}
