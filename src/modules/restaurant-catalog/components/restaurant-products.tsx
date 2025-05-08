import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";
import { Badge } from "@/ui/badge";
import { ProductEntity } from "../domain";
import ProductCategory from "./product-category";
interface IProps {
  products: ProductEntity[];
}
export function RestaurantProducts({ products }: IProps) {
  console.log(products);
  return (
    <section className="px-4">
      {products.map((product, index) => (
        <ProductCategory key={index} product={product} />
      ))}
    </section>
  );
}
