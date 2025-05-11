import { Alert, AlertTitle, AlertDescription } from "@/ui/alert";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/ui/ui/alert-dialog";

import React from "react";
import { useCartStore } from "@/modules/create-ticket/store/cart";

export function AlertClearCart({
  id,
  open,
  setOpen,
  onContinue,
}: {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onContinue: () => void;
}) {
  const items = useCartStore((s) => s.items);
  const infoRestaurant = useCartStore((s) => s.infoRestaurant);
  const clearCart = useCartStore((s) => s.clearCart);

  const shouldShow =
    items.length > 0 && infoRestaurant && infoRestaurant.id !== id;

  const handleContinue = () => {
    clearCart();
    setOpen(false);
    onContinue();
  };

  if (!shouldShow) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Limpar carrinho?</AlertDialogTitle>
          <AlertDialogDescription>
            Você já possui itens no carrinho de outro restaurante. Deseja limpar
            o carrinho para escolher este restaurante?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            Limpar e continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
