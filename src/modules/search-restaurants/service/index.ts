import { base_url } from "../../../../api";
import { RestaurantRepository, RestaurantEntity } from "../domain";

export function RestaurantService(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
): RestaurantRepository {
  const service: RestaurantRepository = {
    async getAll(): Promise<RestaurantEntity[]> {
      const response = await fetchFn!(
        `https://api-magalu-desafio.vercel.app/api/restaurants`
      );
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
    getByOpenStatus(restaurants: RestaurantEntity[]): {
      openRestaurantes: RestaurantEntity[];
      closedRestaurantes: RestaurantEntity[];
    } {
      const openRestaurantes = restaurants.filter(
        (restaurant) => restaurant.open == true
      );
      const closedRestaurantes = restaurants.filter(
        (restaurant) => restaurant.open == false
      );
      return { openRestaurantes, closedRestaurantes };
    },
  };
  return service;
}
