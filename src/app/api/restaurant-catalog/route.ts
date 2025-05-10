import { NextResponse } from "next/server";
import data from "@/db/products.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log("searchParams", searchParams);
  const id = searchParams.get("id");
  const productsFiltered = data.filter(
    (product) => product.idRestaurant === id
  );
  return NextResponse.json(productsFiltered);
}
