import { NextResponse } from "next/server";
import data from "@/db/productsDetails.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const productsFiltered = data.find((product) => product.id === id);
  return NextResponse.json(productsFiltered);
}
