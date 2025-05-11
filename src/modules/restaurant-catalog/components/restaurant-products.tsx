import { ProductEntity } from "../domain";
import ProductCategory from "./product-category";
interface IProps {
  products: ProductEntity[];
  idRestaurant: string;
}
export function RestaurantProducts({ products, idRestaurant }: IProps) {
  return (
    <section className="px-4">
      {products.map((product, index) => (
        <ProductCategory
          restaurantId={idRestaurant}
          key={index}
          product={product}
        />
      ))}
    </section>
  );
}
