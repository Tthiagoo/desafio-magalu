import React from "react";
import { renderAllOptions } from "./render-options";

export default function TicketCustomizationItem({
  option,
  product,
}: {
  option: any;
  product: any;
}) {
  return (
    <div className="text-xs text-neutral-700 mt-1 space-y-0.5">
      {(product as any).customizationOptions &&
        (product as any).customizationOptions.map((opt: any, idx: number) => (
          <div key={idx}>
            <span className="font-semibold">{opt.title}:</span> {opt.value}
          </div>
        ))}
      {!(product as any).customizationOptions &&
        product.options &&
        renderAllOptions(product.options, product)}
      {product.observation && (
        <div className="bg-neutral-100 rounded px-2 py-1 mt-1 text-xs text-neutral-700 border border-neutral-200">
          <span className="font-semibold">observação:</span>{" "}
          {product.observation}
        </div>
      )}
    </div>
  );
}
