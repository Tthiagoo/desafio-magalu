import { RestaurantEntity, RestaurantRepository } from "../domain";

export class RestaurantInfra implements RestaurantRepository {
  async getAll(): Promise<RestaurantEntity[]> {
    const response = await fetch("http://localhost:3001/restaurants");
    return await response.json();
  }
}
