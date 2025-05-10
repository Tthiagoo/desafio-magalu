"use client";

import { useState, useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

export function useFilterRestaurants() {
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
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [search, router, searchParams]);
  return { search, setSearch };
}

export function useFilterOpenRestaurants() {}
