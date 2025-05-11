import { base_url } from "../../../../api";
import { ITicketRepository, ITicketEntity } from "../domain";

export function serviceTicket(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) {
  const service: ITicketRepository = {
    createTicket() {},
    async getCustomizationByProductId(id: string): Promise<ITicketEntity> {
      const response = await fetchFn!(
        `${base_url}/productCustomization?id=${id}`
      );
      return await response.json();
    },
  };
  return service;
}
