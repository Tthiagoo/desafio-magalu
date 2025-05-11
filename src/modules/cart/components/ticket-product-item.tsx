"use client";
import React from "react";
import { Pencil, Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import TicketCustomizationItem from "./ticket-customization-item";
import { useCartStore } from "@/modules/create-ticket/store/cart";
import { formatMoney } from "@/lib/utils";
import { CartItem, Product } from "@/modules/create-ticket/types";

interface TicketProductItemProps {
  product: CartItem;
  quantity: number;
  options?: Record<string, any>;
}

export function TicketProductItem({
  product,
  quantity,
  options,
}: TicketProductItemProps) {
  const updateItem = useCartStore((s) => s.updateItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const router = useRouter();

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
  
  return (
    <div className="border-b border-neutral-200 pb-4 mb-2 last:border-b-0 last:pb-0 last:mb-0">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-bold text-base text-neutral-800">
              {product.product.name}
            </span>
            <span className="font-bold text-purple-600 text-lg">
              {formatMoney(product.product.price || 0)}
            </span>
          </div>

          <TicketCustomizationItem customizations={options || {}} />

          {product.observation && (
            <div className="mt-2 text-sm bg-neutral-100 text-neutral-500 ">
              <span className="font-bold">Observação:</span>{" "}
              {product.observation}
            </div>
          )}
          <div className="flex items-center justify-end gap-2 mt-2">
            <div className="flex items-center gap-2 ml-auto">
              {quantity <= 1 ? (
                <button
                  className="border border-red-500 rounded-full w-7 h-7 flex items-center justify-center text-red-500 text-lg"
                  onClick={() => removeItem(product.product.id)}
                  title="Remover"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  className="border border-teal-600 rounded-full w-7 h-7 flex items-center justify-center text-teal-600 disabled:text-neutral-300 text-lg"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  title="Diminuir"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
              <span className="font-semibold text-base w-4 text-center">
                {quantity}
              </span>
              <button
                className="border border-teal-600 rounded-full w-7 h-7 flex items-center justify-center text-teal-600 text-lg"
                onClick={handleIncrement}
                title="Adicionar"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                className="flex items-center gap-1 text-teal-600 font-semibold text-sm hover:underline px-1 ml-2"
                onClick={() => {
                  router.push(
                    `/restaurant/${product.product.id}/product/${product.product.id}`
                  );
                }}
              >
                <Pencil className="w-4 h-4" /> editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
