import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListRestaurant from "../components/list-restaurant";
import { RestaurantEntity } from "../domain";

const mockRestaurants: RestaurantEntity[] = [
  {
    id: "1",
    name: "Sushi",
    image: "/sushi.png",
    deliveryFee: 0,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Pizza",
    image: "/pizza.png",
    deliveryFee: 5,
    rating: 4.2,
  },
];

jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => "", // ou o valor que quiser testar
  }),
}));

describe("ListRestaurant", () => {
  it("should render restaurants", () => {
    render(<ListRestaurant restaurants={mockRestaurants} />);

    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("Pizza")).toBeInTheDocument();

    const items = screen.getAllByRole("heading");
    expect(items).toHaveLength(2);
  });
});
