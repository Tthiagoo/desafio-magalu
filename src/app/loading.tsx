import { Skeleton } from "@/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col items-center">
      <Skeleton className="max-h-[130px] mt-[2px] object-contain w-full max-w-[765px] h-[130px]" />
      <section className="flex flex-col mt-3 overflow-y-auto items-start w-full max-w-4xl gap-4 pt-6 px-4 h-[calc(100vh-280px)] sm:h-[calc(100vh-300px)]">
        <strong className="text-xl sm:text-3xl font-bold text-primary">
          abertos
        </strong>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 bg-accent/40 rounded-lg w-full h-[100px]"
            >
              <Skeleton className="w-[64px] h-[64px] rounded-md" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <strong className="text-xl sm:text-3xl font-bold text-primary mt-6">
          fechados
        </strong>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-3 bg-accent/40 rounded-lg w-full h-[100px]"
            >
              <Skeleton className="w-[64px] h-[64px] rounded-md" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
