import { ITicketEntity } from "./../domain/index";
import { ITicketRepository } from "../domain";

export function serviceTicket(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) {
  const service: ITicketRepository = {
    createTicket(ticket) {},
    async getCustomizationByProductId(id: string): Promise<ITicketEntity> {
      const response = await fetchFn!(
        `http://localhost:3000/api/productCustomization?id=${id}`
      );
      return await response.json();
    },
  };
  return service;
}
