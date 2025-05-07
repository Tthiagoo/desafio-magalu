import ListRestaurant from "@/modules/search-restaurants/components/list-restaurant";
import { restaurantUseCase } from "@/modules/search-restaurants/useCase";
import { Button } from "@/ui/button";
import Image from "next/image";

export default async function Home() {
  const restaurants = await restaurantUseCase.getAllRestaurants();

  return (
    <main className="flex flex-col items-center">
      <Image
        alt="banner promo"
        src="/banner1.png"
        width={0}
        height={0}
        className="max-h-[130px] mt-[2px] object-contain  w-full "
        sizes="100%"
      />

      <section className="flex flex-col mt-3  overflow-y-auto items-start w-full max-w-4xl gap-4 pt-6 px-4  h-[calc(100vh-280px)] sm:h-[calc(100vh-300px)]">
        <strong className="text-xl sm:text-3xl font-bold text-primary">
          abertos
        </strong>
        <ListRestaurant restaurants={restaurants} />
      </section>
    </main>
  );
}
