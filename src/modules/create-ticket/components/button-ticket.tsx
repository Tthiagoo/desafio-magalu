"use client";
import { Button } from "@/ui/button";
import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cart";
import { useRouter } from "next/navigation";

export default function ButtonTicket({ productId }: { productId: string }) {
  const [hasQuantity, setHasQuantity] = useState(false);
  const items = useCartStore((s) => s.items);
  const router = useRouter();

  useEffect(() => {
    // Find the cart item for this product
    const item = items.find((i) => i.product.id === productId);
    setHasQuantity(!!item && item.quantity > 0);
  }, [items, productId]);

  return (
    <Button
      className="w-64 sm:w-full sm:mt-4"
      disabled={!hasQuantity}
      onClick={() => {
        if (hasQuantity) {
          router.push("/ticket");
        }
      }}
    >
      ver ticket
    </Button>
  );
}
