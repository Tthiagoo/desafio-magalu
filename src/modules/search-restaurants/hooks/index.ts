"use client";

import { useState, useEffect, useCallback } from "react";

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
  }, [search]);
  return { search, setSearch };
}
