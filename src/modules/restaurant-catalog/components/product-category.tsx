import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Badge } from "@/ui/badge";
import React from "react";
import { ProductEntity } from "../domain";
interface IProps {
  product: ProductEntity;
}

export default function ProductCategory({ product }: IProps) {
  return (
    <Accordion type="single" collapsible className="border-b-2 ">
      <AccordionItem value="temakis">
        <AccordionTrigger className="text-base font-semibold cursor-pointer">
          {product.name}
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground mb-2">
            {product.description}
          </p>
          {product.variants.map((variant, index) => (
            <div
              key={index}
              className="flex flex-col border-b mt-2 pb-2 pl-2 mb-2"
            >
              <div className="flex flex-row  justify-between items-center">
                <div className="flex flex-col  w-full gap-1">
                  <span className="font-medium">{variant.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {variant.description}
                  </span>
                </div>

                <div className="flex flex-col w-full max-w-24  items-center space-x-2">
                  {variant.oldPrice && (
                    <span className="text-sm line-through text-muted-foreground">
                      R$ {variant.oldPrice.toFixed(2)}
                    </span>
                  )}
                  {variant.from && (
                    <Badge variant="outline" className="text-xs">
                      a partir de
                    </Badge>
                  )}

                  <span
                    className={`text-sm font-bold ${
                      variant.promo ? "text-green-500" : "text-purple-600"
                    } `}
                  >
                    R${variant.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
