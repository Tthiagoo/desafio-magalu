import { RestaurantEntity } from "@/modules/search-restaurants/domain";
import { ProductEntity, RestaurantCatalogRepository } from "../domain";
import { base_url } from "../../../../api";

export function CatalogService(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): RestaurantCatalogRepository {
  const service: RestaurantCatalogRepository = {
    async getCatalogById(id: string): Promise<ProductEntity[]> {
      const response = await fetchFn!(
        `${base_url}/restaurant-catalog?id=${id}`
      );
      return await response.json();
    },
    async getRestaurantInfo(idRestaurant: string): Promise<RestaurantEntity> {
      const response = await fetchFn!(
        `${base_url}/restaurant-detail?id=${idRestaurant}`
      );
      return await response.json();
    },
  };
  return service;
}
