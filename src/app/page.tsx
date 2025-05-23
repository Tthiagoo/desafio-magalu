import ListRestaurant from "@/modules/search-restaurants/components/list-restaurant";
import { RestaurantService } from "@/modules/search-restaurants/service";
import Image from "next/image";

export const revalidate = 60;

export const metadata = {
  title: "ai q fome - Encontre os melhores restaurantes",
  description: "Descubra e peça nos melhores restaurantes com o ai q fome!",
  openGraph: {
    title: "ai q fome - Encontre os melhores restaurantes",
    description: "Descubra e peça nos melhores restaurantes com o ai q fome!",
    images: ["/banner1.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ai q fome - Encontre os melhores restaurantes",
    description: "Descubra e peça nos melhores restaurantes com o ai q fome!",
    images: ["/banner1.png"],
  },
};

export default async function Home() {
  const { getAll } = RestaurantService(fetch);
  const restaurants = await getAll();
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
        <ListRestaurant restaurants={restaurants} />
      </section>
    </main>
  );
}
