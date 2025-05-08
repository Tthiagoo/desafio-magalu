export interface RestaurantEntity {
  id: string;
  name: string;
  image: string;
  deliveryFee: number;
  rating: number;
  minOrder: number;
  freeShippingAbove: number;
  deliveryTime: string;
  closingHour: string;
  freeMinimunDelivery: string;
  distance: string;
  open: boolean;
}

export interface RestaurantRepository {
  getAll(): Promise<RestaurantEntity[]>;
  getByName(name: string, restaurants: RestaurantEntity[]): RestaurantEntity[];
  getByOpenStatus(restaurants: RestaurantEntity[]): {
    openRestaurantes: RestaurantEntity[];
    closedRestaurantes: RestaurantEntity[];
  };
}
