import ListRestaurant from "@/modules/search-restaurants/components/list-restaurant";
import { Button } from "@/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Image
        alt="banner promo"
        src="/banner1.png"
        width={0}
        height={0}
        className="max-h-[130px] mt-[2px] object-contain  w-full "
        sizes="100%"
        quality={100}
      />

      <section className="flex flex-col  overflow-y-auto items-start w-full max-w-3xl gap-4 pt-6 px-4  h-[calc(100vh-270px)] sm:h-[calc(100vh-300px)]">
        <strong className="text-xl sm:text-3xl font-bold text-primary">
          abertos
        </strong>
        <ListRestaurant />
      </section>
    </main>
  );
}
