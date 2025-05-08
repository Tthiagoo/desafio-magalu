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

  console.log(id);

  const { getCatalogById, getRestaurantInfo } = CatalogService(fetch);

  const products = await getCatalogById(id);
  const restaurantInfoResponse = await getRestaurantInfo(id);
  console.log(restaurantInfoResponse);

  return (
    <div className=" w-full  items-center flex flex-col mt-2 h-full overflow-y-auto">
      <div className="flex-grow max-w-[620px]  w-full">
        <div className="py-4 space-y-3 w-full">
          <RestaurantHeader info={restaurantInfoResponse} />
          <RestaurantInfo info={restaurantInfoResponse} />
          <RestaurantProducts products={products} />
        </div>
      </div>
    </div>
  );
}
