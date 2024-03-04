import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const respone = await fetch(`${API_BASE_URL}/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!respone.ok) throw new Error("Không thành công");

    return respone.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createRestaurantRequest);

  if (isSuccess) {
    toast.success("Tạo nhà hàng thành công")
  }

  if(error) {
    toast.error("Không thành công!")
  }

  return { createRestaurant, isLoading };
};
