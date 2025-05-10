import React from "react";
import { formatMoney } from "@/lib/utils";

export function MultiOption({ title, value }: { title: string; value: any[] }) {
  return (
    <div className="text-sm pl-1 mb-3">
      <div className="font-bold">• {title}</div>
      {value.map((opt, i) => (
        <div key={i} className="ml-2 font-semibold text-neutral-500 mt-1">
          {opt.label}
          {opt.quantity ? ` x${opt.quantity}` : ""}
          {opt.price > 0 && (
            <span className="text-teal-500 font-bold ml-2">
              +{formatMoney(opt.price)}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
