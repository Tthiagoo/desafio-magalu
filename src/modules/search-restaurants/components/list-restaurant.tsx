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

export interface IRestaurant {
  id: number;
  name: string;
  image: string;
  deliveryFee: number;
  rating: number;
}
export interface IProps {
  restaurants: IRestaurant[];
}

export default function ListRestaurant({ restaurants }: IProps) {
  console.log(restaurants);
  return (
    <>
      {restaurants.map((restaurant, index) => (
        <ItemRestaurant key={index} {...restaurant} />
      ))}
    </>
  );
}
