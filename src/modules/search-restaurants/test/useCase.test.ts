import { RestaurantEntity, RestaurantRepository } from "../domain";
import { RestaurantUseCase } from "../useCase";

describe("test bussiness logic restaurant", () => {
  it("should return a list of restaurants", async () => {
    const mockData: RestaurantEntity[] = [
      {
        id: "1",
        name: "Restaurante A",
        image: "/image.jpg",
        deliveryFee: 0,
        rating: 4.5,
      },
    ];

    const mockRepository: RestaurantRepository = {
      getAll: jest.fn().mockResolvedValue(mockData),
    };

    const useCase = new RestaurantUseCase(mockRepository);

    const result = await useCase.getAllRestaurants();

    expect(result).toEqual(mockData);
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
  });
});
