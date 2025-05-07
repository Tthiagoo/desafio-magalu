import { RestaurantRepository, RestaurantEntity } from "../domain";

export function RestaurantService(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): RestaurantRepository {
  const service: RestaurantRepository = {
    async getAll(): Promise<RestaurantEntity[]> {
      const response = await fetchFn!("http://localhost:3001/restaurants");
      return await response.json();
    },
    getByName(
      name: string,
      restaurants: RestaurantEntity[]
    ): RestaurantEntity[] {
      const restaurantes = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(name.toLowerCase())
      );
      return restaurantes;
    },
  };
  return service;
}
