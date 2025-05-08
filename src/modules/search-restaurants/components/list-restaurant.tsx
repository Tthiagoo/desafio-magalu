"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import React from "react";
import ItemRestaurant from "./item-restaurant";
import { RestaurantEntity } from "../domain";
import { useSearchParams } from "next/navigation";
import { RestaurantService } from "../service";

export interface IProps {
  restaurants: RestaurantEntity[];
}

export default function ListRestaurant({ restaurants }: IProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const { getByName, getByOpenStatus } = RestaurantService();
  const filteredRestaurantsByName = getByName(query, restaurants);
  const { openRestaurantes, closedRestaurantes } = getByOpenStatus(
    filteredRestaurantsByName
  );
  console.log(restaurants);
  console.log(openRestaurantes, closedRestaurantes);
  return (
    <>
      <strong className="text-xl sm:text-3xl font-bold text-primary">
        abertos
      </strong>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {openRestaurantes.map((restaurant, index) => (
          <ItemRestaurant key={index} {...restaurant} />
        ))}
      </div>
      <strong className="text-xl sm:text-3xl font-bold text-primary">
        fechados
      </strong>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {closedRestaurantes.map((restaurant, index) => (
          <ItemRestaurant key={index} {...restaurant} />
        ))}
      </div>
    </>
  );
}
