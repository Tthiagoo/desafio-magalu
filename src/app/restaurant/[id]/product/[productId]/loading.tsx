import { Skeleton } from "@/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-full items-center flex flex-col h-full overflow-y-auto">
      <div className="w-full max-w-[600px] flex flex-col items-center">
        <Skeleton className="w-full h-[180px] rounded-b-lg mb-4" />
        <div className="px-4 w-full">
          <Skeleton className="h-7 w-1/2 mb-2" />
          <Skeleton className="h-5 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
        </div>
      </div>

      <div className="flex items-center justify-between w-full max-w-[600px] px-4 mb-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      <div className="w-full max-w-[600px] px-4 flex flex-col gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-5 w-1/2 mb-1" />
            <div className="flex flex-col gap-2">
              {[...Array(2)].map((_, j) => (
                <div key={j} className="flex items-center gap-3">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-[600px] px-4 mt-6">
        <Skeleton className="h-5 w-1/3 mb-3" />
        <div className="flex flex-col gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16 ml-auto" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[600px] px-4 mt-6">
        <Skeleton className="h-5 w-1/2 mb-2" />
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="w-full max-w-[620px] px-4 mt-6 mb-12">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
