import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import React from "react";
import Image from "next/image";
import ItemRestaurant from "./item-restaurant";
import { RestaurantEntity } from "../domain";

export interface IProps {
  restaurants: RestaurantEntity[];
}

export default function ListRestaurant({ restaurants }: IProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {restaurants.map((restaurant, index) => (
        <ItemRestaurant key={index} {...restaurant} />
      ))}
    </div>
  );
}
