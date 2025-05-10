import React from "react";
import { formatMoney } from "@/lib/utils";

export function QuantityOption({
  title,
  value,
}: {
  title: string;
  value: Record<string, any>;
}) {
  const valuesArr = Object.values(value) as Array<{
    label?: string;
    quantity?: number;
    price?: number;
  }>;
  if (!valuesArr.length || !valuesArr[0]?.label) return null;
  return (
    <div className="text-sm pl-1 mb-3">
      <div className="font-bold text-light-text">• {title}</div>
      {valuesArr.map((opt, i) => (
        <div key={i} className="ml-2 font-semibold text-neutral-500 mt-1">
          {opt.label}
          {opt.quantity ? ` x${opt.quantity}` : ""}
          {typeof opt.price === "number" && opt.price > 0 && (
            <span className="text-teal-500 font-bold ml-2">
              +{formatMoney(opt.price as number)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
