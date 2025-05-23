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
  value: number;
};

export type IProductCustomization = BaseCustomization;

export type Product = {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  customization: IProductCustomization[];
};

export type AppliedCustomizationEntry = {
  title: string;
  value:
    | CustomizationOption
    | CustomizationOption[]
    | Record<string, number>
    | Record<string, { label: string; quantity: number; price?: number }>;
};

export type AppliedCustomizations = {
  [customizationId: string]: AppliedCustomizationEntry;
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
    price?: number;
  };
  quantity: number;
  options?: string[];
  observation?: string;
}
