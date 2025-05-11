"use client";
import { ChevronRight, Share2 } from "lucide-react";
import React, { useCallback } from "react";
import { FavoriteButton } from "./favorite-button";
import Image from "next/image";
import { RestaurantEntity } from "@/modules/search-restaurants/domain";
interface IProps {
  info: RestaurantEntity;
}
export default function RestaurantHeader({ info }: IProps) {
  const handleShare = useCallback(() => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert("Link copiado para a área de transferência!");
      });
    }
  }, []);

  return (
    <div className="flex flex-col  justify-between gap-3 px-4">
      <div className="flex items-center gap-3">
        <Image
          width={37}
          height={37}
          src={info.image}
          alt={"restaurant logo"}
          className="rounded"
        />
        <h1 className="font-extrabold text-dark-text text-[1.25rem]">
          {info.name}
        </h1>
      </div>
      <div className="text-purple-brand flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            title="Copiar link da página"
            className="flex items-center"
          >
            <Share2 size={25} className="cursor-pointer text-purple-500" />
          </button>
          <FavoriteButton />
        </div>
        <a className="text-teal-500 font-bold flex items-center gap-1">
          <span>mais infos</span>
          <ChevronRight size={14} />
        </a>
      </div>
    </div>
  );
}
