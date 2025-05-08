import { RestaurantEntity } from "@/modules/search-restaurants/domain";
import { ProductEntity, RestaurantCatalogRepository } from "../domain";

export function CatalogService(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): RestaurantCatalogRepository {
  const service: RestaurantCatalogRepository = {
    async getCatalogById(id: string): Promise<ProductEntity[]> {
      const response = await fetchFn!("http://localhost:3001/products");
      const products: ProductEntity[] = await response.json();
      console.log(products);
      const productsFiltered = products.filter(
        (product) => product.idRestaurant === id
      );
      return await productsFiltered;
    },
    async getRestaurantInfo(idRestaurant: string): Promise<RestaurantEntity> {
      const response = await fetchFn!("http://localhost:3001/restaurants");
      const restaurantInfo: RestaurantEntity[] = await response.json();
      const restaurantFiltered = restaurantInfo.find(
        (restaurant) => restaurant.id === idRestaurant
      );
      return await restaurantFiltered!;
    },
  };
  return service;
}
