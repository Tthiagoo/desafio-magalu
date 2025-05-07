import { Input } from "@/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

export function InputSearchRestaurant() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Added relative positioning to the parent div */}
      <SearchIcon color="gray" size={20} className=" absolute top-6 left-2" />
      <Input
        className="mt-4 h-10 pl-8 pt-4 pb-4"
        placeholder="busque pela loja ou culinária"
        type="text"
      />
      {/* Added padding-left to the Input for icon spacing */}
    </div>
  );
}
