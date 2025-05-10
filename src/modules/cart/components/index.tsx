"use client";
import React from "react";
import { Pencil, Plus, Minus } from "lucide-react";
import Image from "next/image";

export interface TicketProductItemProps {
  product: {
    name: string;
    price: number;
    quantity: number;
    options?: string[];
    observation?: string;
  };
}

export function TicketProductItem({ product }: TicketProductItemProps) {
  function renderOptions(options: string[]) {
    return options.map((opt, i) => {
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
              {product.name}
            </span>
            <span className="font-bold text-purple-600 text-lg">
              R$ {product.price.toFixed(2)}
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

export function TicketSummary({ subtotal }: { subtotal: number }) {
  return (
    <div className="fixed bottom-0 left-0 w-full max-w-md mx-auto bg-white rounded-t-2xl shadow-lg p-4 z-20 border-t border-neutral-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-neutral-600 text-base">subtotal</span>
        <span className="font-bold text-lg text-purple-700">
          R$ {subtotal.toFixed(2)}
        </span>
      </div>
      <button className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg py-3 mt-2 transition-colors text-base">
        ir para pagamento
      </button>
    </div>
  );
}

export interface TicketRestaurantHeaderProps {
  restaurant: {
    name: string;
    image: string;
  };
}

export function TicketRestaurantHeader({
  restaurant,
}: TicketRestaurantHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Image
        src={restaurant.image}
        alt={restaurant.name}
        className="w-10 h-10 rounded object-cover"
        width={40}
        height={40}
      />
      <div>
        <div className="text-xs text-neutral-500">seus itens em</div>
        <div className="font-bold text-base text-neutral-800">
          {restaurant.name}
        </div>
      </div>
    </div>
  );
}
