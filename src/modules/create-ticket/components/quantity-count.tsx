import { CircleMinus, CirclePlus } from "lucide-react";

interface QuantityCountProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityCount({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityCountProps) {
  return (
    <div className="flex items-center gap-3 justify-center">
      <button onClick={onDecrement} disabled={quantity <= 0}>
        <CircleMinus className="text-teal-500" />
      </button>

      <span className="font-bold text-sm min-w-[12px] text-center">
        {quantity}
      </span>

      <button onClick={onIncrement}>
        <CirclePlus className="text-teal-500" />
      </button>
    </div>
  );
}
