"use client";
import React, { use } from "react";
import {
  TicketProductItem,
  TicketSummary,
  TicketRestaurantHeader,
} from "../../modules/cart/components";
import { useCartStore } from "@/modules/create-ticket/store/cart";

const mockRestaurant = {
  name: "Matsuri Concept",
  image: "/images-restaurants/matsuri.png",
};

const mockProducts = [
  {
    name: "Ceviche de salmão",
    image: "/images-restaurants/matsuri.png",
    price: 19.9,
    quantity: 2,
    options: ["tamanho médio", "vai querer bebida? coca-cola +R$5,00"],
    observation: "tirar a cebolinha",
  },
  {
    name: "Temaki Filadélfia",
    image: "/images-restaurants/matsuri.png",
    price: 14.0,
    quantity: 1,
    options: [
      "escolha 3 ingredientes",
      "shimeji",
      "cream cheese",
      "tomate seco",
    ],
    observation: "tirar a cebolinha",
  },
  {
    name: "Temaki Mix",
    image: "/images-restaurants/matsuri.png",
    price: 22.0,
    quantity: 1,
    options: ["quer o dobro? salmão +R$8,00"],
  },
  {
    name: "Coca-cola lata",
    image: "/images-restaurants/matsuri.png",
    price: 10.0,
    quantity: 2,
  },
  {
    name: "Temaki Filadélfia",
    image: "/images-restaurants/matsuri.png",
    price: 14.0,
    quantity: 1,
    options: [
      "escolha 3 ingredientes",
      "shimeji",
      "cream cheese",
      "tomate seco",
    ],
    observation: "tirar a cebolinha",
  },
  {
    name: "Temaki Filadélfia",
    image: "/images-restaurants/matsuri.png",
    price: 14.0,
    quantity: 1,
    options: [
      "escolha 3 ingredientes",
      "shimeji",
      "cream cheese",
      "tomate seco",
    ],
    observation: "tirar a cebolinha",
  },
  {
    name: "Temaki Filadélfia",
    image: "/images-restaurants/matsuri.png",
    price: 14.0,
    quantity: 1,
    options: [
      "escolha 3 ingredientes",
      "shimeji",
      "cream cheese",
      "tomate seco",
    ],
    observation: "tirar a cebolinha",
  },
];

const subtotal = mockProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);

export default function Ticket() {
  const items = useCartStore((state) => state.items);

  return (
    <div className="max-w-md mx-auto mt-4  px-2">
      <TicketRestaurantHeader />
      {items.map((product, i) => (
        <TicketProductItem key={i} product={product} />
      ))}
      <div className="h-24" />
      <TicketSummary subtotal={subtotal} />
    </div>
  );
}
