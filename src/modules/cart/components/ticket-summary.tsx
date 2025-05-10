"use client";
import React from "react";

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
