"use client";
import React from "react";
import { Pencil, Plus, Minus } from "lucide-react";

import TicketCustomizationItem from "./ticket-customization-item";
import { useCartStore } from "@/modules/create-ticket/store/cart";

export function TicketProductItem({ product, quantity, options }: any) {
  const addToCart = useCartStore((s) => s.addToCart);
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    updateItem(product.product.id, {
      ...product,
      quantity: newQuantity,
    });
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeItem(product.product.id);
    } else {
      updateItem(product.product.id, {
        ...product,
        quantity: quantity - 1,
      });
    }
  };
  console.log("[TicketProductItem] render", { product });
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
                disabled={quantity <= 1}
                onClick={handleDecrement}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-base w-4 text-center">
                {quantity}
              </span>
              <button
                className="border border-teal-600 rounded-full w-7 h-7 flex items-center justify-center text-teal-600 text-lg"
                onClick={handleIncrement}
              >
                <Plus className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 text-teal-600 font-semibold text-sm hover:underline px-1 ml-2">
                <Pencil className="w-4 h-4" /> editar
              </button>
            </div>
          </div>
          <TicketCustomizationItem customizations={options} />
        </div>
      </div>
    </div>
  );
}
