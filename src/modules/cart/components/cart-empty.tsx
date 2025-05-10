import Link from "next/link";
import React from "react";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-neutral-400 text-lg font-semibold">
      Seu carrinho está vazio
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-full font-semibold text-base hover:bg-teal-700 transition-colors"
      >
        Ir para o catálogo
      </Link>
    </div>
  );
}
