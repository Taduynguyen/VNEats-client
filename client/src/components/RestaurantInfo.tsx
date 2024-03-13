import { Restaurant } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { vietnameseCityMap } from "@/vietnameseCityMap";
import { Dot } from "lucide-react";

const convertToVietnamese = (city: string): string => {
  const vietnameseCity = vietnameseCityMap[city.toLowerCase()];
  return vietnameseCity || city;
};

type Props = {
  restaurant: Restaurant;
};
const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription>
          {convertToVietnamese(restaurant.city)}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
