import { RestaurantEntity } from "@/modules/search-restaurants/domain";

export interface IProductVariant {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  promo: boolean;
  from?: boolean;
}

export interface ProductEntity {
  id: string;
  idRestaurant: string;
  name: string;
  description: string;
  variants: IProductVariant[];
}

export interface RestaurantCatalogRepository {
  getCatalogById(idRestaurant: string): Promise<ProductEntity[]>;
  getRestaurantInfo(idRestaurant: string): Promise<RestaurantEntity>;
}
