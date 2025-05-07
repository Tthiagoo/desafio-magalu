import { RestaurantService } from "../service";

describe("RestaurantService", () => {
  it("should fetch all restaurants", async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockRestaurants),
    });

    const service = RestaurantService(mockFetch);
    const result = await service.getAll();

    expect(result).toEqual(mockRestaurants);
  });

  it("should filter restaurants by name", () => {
    const service = RestaurantService();

    const filtered = service.getByName("Pizza", mockRestaurants);

    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe("Pizza Place");
  });
});
const mockRestaurants = [
  {
    id: "1",
    name: "Pizza Place",
    image: "pizza.jpg",
    deliveryFee: 2.5,
    rating: 4.5,
  },
  {
    id: "2",
    name: "Burger Joint",
    image: "burger.jpg",
    deliveryFee: 3.0,
    rating: 4.0,
  },
];
