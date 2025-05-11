import React from "react";

export function SingleOption({
  title,
  value,
}: {
  title: string;
  value: { label: string; quantity?: number };
}) {
  return (
    <div className="text-sm pl-1 mb-3">
      <div className="font-bold">• {title}</div>
      <div className="ml-2 font-semibold text-neutral-500 mt-1">
        {value.label}
        {value.quantity ? ` x${value.quantity}` : ""}
      </div>
    </div>
  );
}
