"use client";
import React from "react";
import { Pencil, Plus, Minus } from "lucide-react";
import { CartItem } from "@/modules/create-ticket/types";

// export interface TicketProductItemProps {
//   product: {
//     name: string;
//     price: number;
//     quantity: number;
//     options?: string[];
//     observation?: string;
//   };
// }

export function TicketProductItem({
  product,
  customizations,
  quantity,
  observation,
}: CartItem) {
  console.log("cart item product", product);

  function renderOption(opt: string) {
    const match = opt.match(/(.+?)(\s*\+R\$[\d,.]+)/);
    if (match) {
      return (
        <span>
          {match[1]}
          <span className="text-teal-600 font-semibold">{match[2]}</span>
        </span>
      );
    }
    return opt;
  }

  function renderOptions(options: string[]) {
    return options.map((opt, i) => {
      if (opt.includes("?")) {
        const [main, sub] = opt.split("?");
        return (
          <div key={i} className="flex flex-col ml-1">
            <span className="flex items-center gap-1 text-neutral-700">
              <span className="text-neutral-400">•</span>
              <span>{main.trim()}?</span>
            </span>
            <span className="ml-4 text-neutral-400 flex items-center gap-1">
              {renderOption(sub.trim())}
            </span>
          </div>
        );
      }
      if (opt.match(/\+R\$/)) {
        return (
          <div key={i} className="flex items-center gap-1 ml-1">
            <span className="text-neutral-400">•</span>
            {renderOption(opt)}
          </div>
        );
      }
      if (
        opt.match(/^[a-zA-Zãáéíóúçêôûõâêîôû ]+$/) &&
        i > 0 &&
        options[i - 1].includes("escolha")
      ) {
        return (
          <div key={i} className="ml-7 text-neutral-500">
            {opt}
          </div>
        );
      }
      return (
        <div key={i} className="flex items-center gap-1 ml-1">
          <span className="text-neutral-400">•</span>
          <span>{opt}</span>
        </div>
      );
    });
  }

  return (
    <div className="border-b border-neutral-200 pb-4 mb-2 last:border-b-0 last:pb-0 last:mb-0">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-bold text-base text-neutral-800">
              {product.product.name}
            </span>
            <span className="font-bold text-purple-600 text-lg">
              R$ {product.product.inicialPrice}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <div className="flex items-center gap-2 ml-auto">
              <button
                className="border border-teal-600 rounded-full w-7 h-7 flex items-center justify-center text-teal-600 disabled:text-neutral-300 text-lg"
                disabled={product.quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-base w-4 text-center">
                {product.quantity}
              </span>
              <button className="border border-teal-600 rounded-full w-7 h-7 flex items-center justify-center text-teal-600 text-lg">
                <Plus className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 text-teal-600 font-semibold text-sm hover:underline px-1 ml-2">
                <Pencil className="w-4 h-4" /> editar
              </button>
            </div>
          </div>
          <div className="text-xs text-neutral-700 mt-1 space-y-0.5">
            {product.options && renderOptions(product.options)}
            {product.observation && (
              <div className="bg-neutral-100 rounded px-2 py-1 mt-1 text-xs text-neutral-700 border border-neutral-200">
                <span className="font-semibold">observação:</span>{" "}
                {product.observation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
