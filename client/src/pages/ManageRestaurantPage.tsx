import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import LoadingPage from "./LoadingPage";

const ManageRestaurantPage = () => {
   const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant();
   const { restaurant, isLoading: isGetLoading } = useGetRestaurant();

   if (isGetLoading) return <LoadingPage />
 return (
    <ManageRestaurantForm restaurant={restaurant} onSave={createRestaurant} isLoading={isCreateLoading} />
 )
}

export default ManageRestaurantPage;