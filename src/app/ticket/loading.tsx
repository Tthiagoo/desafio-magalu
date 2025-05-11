import { Skeleton } from "@/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-6 p-4">
      <div className="flex items-center gap-3 mb-2">
        <Skeleton className="w-10 h-10 rounded-md" />
        <div className="flex flex-col gap-1 flex-1">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </div>

      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex flex-col gap-2 border-b pb-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex flex-col gap-1 mt-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
      ))}
    </div>
  );
}
