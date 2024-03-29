import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { CheckoutSessionRequest, Order } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyOrdersRequest = async ():Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const respone = await fetch(`${API_BASE_URL}/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (!respone.ok) throw new Error ("Không thành công");

        return respone.json();
    };

    const { data: orders, isLoading } = useQuery("fetchMyOrders", getMyOrdersRequest, {refetchInterval: 5000,});

    return { orders, isLoading };
}


export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently();

        const respone = await fetch(
            `${API_BASE_URL}/order/checkout/create-checkout-session`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(checkoutSessionRequest),
            }
        );

        if (!respone.ok) throw new Error("Không thành công");

        return respone.json();
    };

    const {
        mutateAsync: createCheckoutSession,
        isLoading,
        error,
        reset,
    } = useMutation(createCheckoutSessionRequest);

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return { createCheckoutSession, isLoading };
};
