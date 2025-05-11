import { ITicketRepository, ITicketEntity } from "../domain";

export function serviceTicket(
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
) {
  const service: ITicketRepository = {
    createTicket() {},
    async getCustomizationByProductId(id: string): Promise<ITicketEntity> {
      const response = await fetchFn!(
        `https://api-magalu-desafio.vercel.app/api/productCustomization?id=${id}`
      );
      return await response.json();
    },
  };
  return service;
}
