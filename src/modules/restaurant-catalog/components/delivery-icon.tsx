import Image from "next/image";
import { deliveryType } from "../types";
interface DeliveryTypeProps {
  deliveryPrice: string;
  type: string;
}

export function DeliveryIcon({ type, deliveryPrice }: DeliveryTypeProps) {
  const color = (type: string) => {
    console.log(type);
    const typeSelected = deliveryType[type as keyof typeof deliveryType];

    return typeSelected;
  };

  console.log(type);
  console.log(color(type));
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
