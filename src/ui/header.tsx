"use client";
import * as React from "react";
import Image from "next/image";
import { MapPin, ChevronRight, UserIcon } from "lucide-react";
import { InputSearchRestaurant } from "@/modules/search-restaurants/components/input-search-restaurant";
import { useRouter, usePathname } from "next/navigation";

export function Header() {
  const [address, setAddress] = React.useState("Pesquisar endereço");
  const router = useRouter();
  const pathname = usePathname();
  const showSearchInput = pathname === "/";
  const handleClick = () => {
    router.push("/");
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo seu navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const location = data?.address?.road
            ? `${data.address.road}, ${data.address.city || ""}`
            : "Erro ao buscar endereço, tente novamente";

          setAddress(location);
        } catch (err) {
          console.error("Erro ao buscar endereço:", err);
          alert("Erro ao buscar endereço");
        }
      },
      (error) => {
        console.error("Erro ao obter localização:", error);
        alert("Erro ao obter localização");
      }
    );
  };
  return (
    <header className="bg-primary text-accent  flex flex-col items-center justify-between p-4 ">
      <div className="flex items-center justify-between w-full max-w-96 ">
        <div className="relative w-8 h-8 sm:w-12 sm:h-12" onClick={handleClick}>
          <Image
            src="/aiqlogo.svg"
            alt="Aiq fome logo"
            fill
            className="object-contain dark:invert"
            priority
          />
        </div>
        <div
          className="flex w-full flex-row ml-3 mr-5 items-center gap-1 cursor-pointer"
          onClick={handleGetLocation}
        >
          <MapPin className="cursor-pointer sm:scale-125" />
          <div className="flex flex-col w-full items-start justify-center">
            <span className="text-base sm:text-lg">entregando em</span>
            <span
              className={`text-[0.75rem] sm:text-lg w-full font-bold flex flex-row items-center gap-1`}
            >
              {address} <ChevronRight className="sm:scale-125" />
            </span>
          </div>
        </div>
        <UserIcon className="sm:scale-125" />
      </div>
      {showSearchInput && <InputSearchRestaurant />}
    </header>
  );
}
