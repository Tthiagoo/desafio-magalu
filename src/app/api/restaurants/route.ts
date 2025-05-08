import { NextResponse } from "next/server";
import data from "@/db/restaurants.json";

export async function GET() {
  return NextResponse.json(data);
}
