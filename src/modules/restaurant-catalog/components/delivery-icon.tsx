import Image from "next/image";
import { deliveryType } from "../types";
interface DeliveryTypeProps {
  deliveryPrice: string;
  type: string;
}

export function DeliveryIcon({ type, deliveryPrice }: DeliveryTypeProps) {
  const color = (type: string) => {
    const typeSelected = deliveryType[type as keyof typeof deliveryType];

    return typeSelected;
  };

  return (
    <span className={`flex items-center gap-1 font-bold  ${color(type)}`}>
      <Image
        alt="icone de entrega"
        width={25}
        height={25}
        src={`/icons/${type}.svg`}
      />
      <span className={`${color(type)}`}>{deliveryPrice}</span>
    </span>
  );
}
