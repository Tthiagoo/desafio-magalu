import React from "react";
import { Skeleton } from "@/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col items-center">
      <section className="flex flex-col items-start w-full max-w-2xl gap-4 pt-6 px-4">
        <div className="flex items-center gap-4 w-full">
          <Skeleton className="w-[48px] h-[48px] rounded-md" />
          <Skeleton className="h-8 w-2/3" />
        </div>
        <div className="flex gap-2 items-center w-full">
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="w-6 h-6 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16 ml-auto" />
        </div>
        <div className="flex gap-2 items-center w-full">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <div className="flex flex-col gap-2 w-full mt-6">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-1/4 mt-4" />
          <Skeleton className="h-12 w-full" />
        </div>
      </section>
    </main>
  );
}
