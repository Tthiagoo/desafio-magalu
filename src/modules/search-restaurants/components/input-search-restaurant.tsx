"use client";

import { Input } from "@/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export function InputSearchRestaurant() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("q", search);
      } else {
        params.delete("q");
      }
      router.push(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="flex flex-col max-w-96 w-full relative">
      <SearchIcon
        color="gray"
        size={20}
        className="absolute top-6 sm:top-7 sm:scale-125 left-2"
      />
      <Input
        className="mt-4 h-10 sm:h-12 pl-8 sm:pl-10 sm:text-lg pt-4 pb-4"
        placeholder="busque pela loja ou culinária"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
