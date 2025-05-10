export type CustomizationOption = {
  label: string;
  price?: number;
  hasPromotion?: boolean;
  oldPrice?: number;
  id: string;
};

export type BaseCustomization = {
  id: string;
  title: string;
  description?: string;
  type: "single" | "multi" | "quantity";
  required?: boolean;
  options: CustomizationOption[];
  min?: number;
  max?: number;
};

export type IProductCustomization = BaseCustomization;

export type Product = {
  id: string;
  productId: string;
  name: string;
  image: string;
  inicialPrice: number;
  customization: IProductCustomization[];
};

export type AppliedCustomizations = {
  [customizationId: string]:
    | CustomizationOption
    | CustomizationOption[]
    | Record<string, number>;
};

export type CartItem = {
  product: Product;
  quantity: number;
  customizations: AppliedCustomizations;
  observation?: string;
};

export interface CartItemFromStore {
  id: string;
  productId: string;
  idRestaurant: string;
  imageRestaurant: string;
  nameRestaurant: string;
  product: {
    id: string;
    name: string;
    image: string;
    inicialPrice: number;
  };
  quantity: number;
  options?: string[];
  observation?: string;
}
