import React from "react";

import { SingleOption } from "./SingleOption";
import { MultiOption } from "./MultiOption";
import { QuantityOption } from "./QuantityOption";

export default function TicketCustomizationItem({
  customizations,
}: {
  customizations: Record<string, { title: string; value: any }>;
}) {
  console.log("[TicketCustomizationItem] render", { customizations });
  return (
    <div className="mt-2 space-y-1">
      {Object.entries(customizations).map(([key, entry]) => {
        const title = entry.title;
        const value = entry.value;
        if (value && value.label) {
          return <SingleOption key={title} title={title} value={value} />;
        }
        if (Array.isArray(value)) {
          return <MultiOption key={title} title={title} value={value} />;
        }
        if (value && typeof value === "object") {
          return <QuantityOption key={title} title={title} value={value} />;
        }
        return null;
      })}
    </div>
  );
}
