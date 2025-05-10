"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";

interface IProps {
  productId: string;
}

export function Observation({ productId }: IProps) {
  const items = useCartStore((state) => state.items);
  const updateItemInCart = useCartStore((state) => state.updateItemInCart);
  const item = items.find((item) => item.product.id === productId);
  const [observation, setObservation] = useState(item?.observation || "");

  useEffect(() => {
    setObservation(item?.observation || "");
  }, [item?.observation]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setObservation(e.target.value);
    if (item) {
      updateItemInCart(productId, {
        ...item,
        observation: e.target.value,
      });
    }
  };

  return (
    <div>
      <Label
        htmlFor="observation"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        alguma observação do item?{" "}
        <span className="text-gray-400">• opcional</span>
      </Label>
      <Textarea
        id="observation"
        className="w-full min-h-[80px] p-2 border rounded resize-none"
        placeholder="ex: tirar algum ingrediente, ponto do prato"
        value={observation}
        onChange={handleChange}
      />
    </div>
  );
}
