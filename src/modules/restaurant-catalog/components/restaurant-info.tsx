import { ChevronRight, Star } from "lucide-react";
import { DeliveryIcon } from "./delivery-icon";
import { RestaurantEntity } from "@/modules/search-restaurants/domain";
import { formatMoney } from "@/lib/utils";
interface IProps {
  info: RestaurantEntity;
}
export function RestaurantInfo({ info }: IProps) {
  return (
    <div className=" space-y-2  px-4 text-sm">
      <p className="flex gap-2 items-center">
        <DeliveryIcon
          type={"notfree"}
          deliveryPrice={formatMoney(info.deliveryFee)}
        />
        <ChevronRight size={14} className="text-purple-400" />
        <span className="text-neutral-500 font-bold text-sm">
          hoje, {info.deliveryTime} - {info.distance}
        </span>
      </p>

      <span className=" text-teal-600 text-sm font-bold px-3 py-1.5 mt-2">
        {`Entrega grátis acima de ${formatMoney(info.freeShippingAbove)}`}
      </span>

      <span className="items-center flex gap-1  mt-2">
        <Star
          size={21}
          className="text-yellow-400"
          fill="currentColor"
          strokeWidth={0}
        />
        <span className="text-neutral-500 font-bold text-sm">
          {info.rating} de 5
        </span>
        <ChevronRight size={14} className="text-neutral-400" />
        <span className="text-neutral-400 font-bold text-sm">•</span>
        <span className="font-bold text-green-500  ">
          fecha às {info.closingHour}
        </span>
      </span>

      <div className="text-neutral-400  font-bold text-sm mt-2">
        Pedido mínimo: {formatMoney(info.minOrder)}
      </div>
    </div>
  );
}
