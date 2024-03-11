import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchRespone } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchOtherRestaurant = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchRespone> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const respone = await fetch(
      `${API_BASE_URL}/other/restaurant/search/${city}?${params.toString()}`
    );

    if (!respone.ok) throw new Error("Không tìm thấy");

    return respone.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
