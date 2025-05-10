import { IProductCustomization } from "../types";

export interface ITicketEntity {
  id: string;
  productId: string;
  name: string;
  image: string;
  description: string;
  imageRestaurant?: string;
  nameRestaurant: string;
  inicialPrice: number;
  customization: IProductCustomization[];
}

export interface ITicketRepository {
  getCustomizationByProductId(id: string): Promise<ITicketEntity>;
  createTicket(ticket: ITicketEntity): void;
}
