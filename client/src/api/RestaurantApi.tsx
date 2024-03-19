import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const respone = await fetch(`${API_BASE_URL}/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!respone.ok) throw new Error("Không thành công");

    return respone.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantRequest
  );

  return { restaurant, isLoading };
};

export const useCreateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
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
    toast.success("Tạo nhà hàng thành công");
  }

  if (error) {
    toast.error("Không thành công!");
  }

  return { createRestaurant, isLoading };
};

export const useUpdateRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const respone = await fetch(`${API_BASE_URL}/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!respone.ok) throw new Error("Không thành công!");

    return respone.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);

  if (isSuccess) toast.success("Cập nhật thông tin nhà hàng thành công");

  if (error) toast.error("Không thành công!");

  return { updateRestaurant, isLoading };
};

export const useGetRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getRestaurantRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const respone = await fetch(`${API_BASE_URL}/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!respone.ok) throw new Error("Không thành công");

    return respone.json();
  };

  const { data: orders, isLoading } = useQuery(
    "fetchRestaurantOrder",
    getRestaurantRequest
  );

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

export const useUpdateRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantOrder = async (
    updateOrderStatusRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    const respone = await fetch(
      `${API_BASE_URL}/restaurant/order/${updateOrderStatusRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateOrderStatusRequest.status }),
      }
    );

    if (!respone.ok) throw new Error("Không thành công");

    return respone.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateRestaurantOrder);

  if (isSuccess) toast.success("Cập nhật thành công");

  if (isError) {
    toast.error("Cập nhật không thành công");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
