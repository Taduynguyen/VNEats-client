import { useCreateRestaurant, useGetRestaurant } from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
   const { createRestaurant, isLoading: isCreateLoading } = useCreateRestaurant();
   const { restaurant, isLoading: isGetLoading } = useGetRestaurant();

   if (isGetLoading) return <span>Loading....</span>;
 return (
    <ManageRestaurantForm restaurant={restaurant} onSave={createRestaurant} isLoading={isCreateLoading} />
 )
}

export default ManageRestaurantPage;