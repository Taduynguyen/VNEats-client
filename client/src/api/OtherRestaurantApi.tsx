import { RestaurantSearchRespone } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchOtherRestaurant = (city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchRespone> => {
    const respone = await fetch(
      `${API_BASE_URL}/other/restaurant/search/${city}`
    );

    if (!respone.ok) throw new Error("Không tìm thấy");

    return respone.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants"],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
