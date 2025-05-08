import { NextResponse } from "next/server";
import data from "@/db/restaurants.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const restaurantFiltered = data.find((restaurant) => restaurant.id === id);
  return NextResponse.json(restaurantFiltered);
}
