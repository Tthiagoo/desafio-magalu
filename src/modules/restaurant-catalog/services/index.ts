import { RestaurantEntity } from "@/modules/search-restaurants/domain";
import { ProductEntity, RestaurantCatalogRepository } from "../domain";

export function CatalogService(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): RestaurantCatalogRepository {
  const service: RestaurantCatalogRepository = {
    async getCatalogById(id: string): Promise<ProductEntity[]> {
      console.log(id);
      const response = await fetchFn!(
        `http://localhost:3000/api/restaurant-catalog?id=${id}`
      );

      return await response.json();
    },
    async getRestaurantInfo(idRestaurant: string): Promise<RestaurantEntity> {
      const response = await fetchFn!(
        `http://localhost:3000/api/restaurant-detail?id=${idRestaurant}`
      );

      return await await response.json();
    },
  };
  return service;
}
