import RestaurantHeader from "@/modules/restaurant-catalog/components/restaurant-header";
import { RestaurantInfo } from "@/modules/restaurant-catalog/components/restaurant-info";
import { RestaurantProducts } from "@/modules/restaurant-catalog/components/restaurant-products";
import { CatalogService } from "@/modules/restaurant-catalog/services";
import React from "react";

export default async function Restaurant({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { getCatalogById, getRestaurantInfo } = CatalogService(fetch);

  const products = await getCatalogById(id);
  const restaurantInfoResponse = await getRestaurantInfo(id);

  return (
    <div className=" w-full  items-center flex flex-col mt-2 h-full overflow-y-auto">
      <div className="flex-grow max-w-[620px]  w-full">
        <div className="py-4 space-y-3 w-full">
          <RestaurantHeader info={restaurantInfoResponse} />
          <RestaurantInfo info={restaurantInfoResponse} />
          <RestaurantProducts idRestaurant={id} products={products} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { getRestaurantInfo } = CatalogService(fetch);
  const restaurantInfo = await getRestaurantInfo(id);
  const title = restaurantInfo?.name;
  const image = restaurantInfo?.image;

  const description = `Confira o restaurante ${title} no Magalu!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
