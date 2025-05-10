"use client";
import React from "react";
import { Pencil, Plus, Minus } from "lucide-react";
import type { CartItemFromStore } from "@/modules/create-ticket/types";
import { renderAllOptions } from "./render-options";

export function TicketProductItem(product: CartItemFromStore) {
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
            {product.options && renderAllOptions(product.options, product)}
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
