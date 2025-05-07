import { RestaurantRepository, RestaurantEntity } from "../domain";
import { RestaurantInfra } from "../infra";

export class RestaurantUseCase {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async getAllRestaurants(): Promise<RestaurantEntity[]> {
    return this.restaurantRepository.getAll();
  }
}
export const restaurantUseCase = new RestaurantUseCase(new RestaurantInfra());
