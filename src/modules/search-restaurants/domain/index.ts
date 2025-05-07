import { get } from "http";
export interface RestaurantEntity {
  id: string;
  name: string;
  image: string;
  deliveryFee: number;
  rating: number;
}

export interface RestaurantRepository {
  getAll(): Promise<RestaurantEntity[]>;
  getByName(name: string, restaurants: RestaurantEntity[]): RestaurantEntity[];
}
