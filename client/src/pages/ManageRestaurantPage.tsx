import {
  useCreateRestaurant,
  useGetRestaurant,
  useGetRestaurantOrder,
  useUpdateRestaurant,
} from "@/api/RestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import LoadingPage from "./LoadingPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderItemCart from "@/components/OrderItemCart";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateRestaurant();
  const { restaurant, isLoading: isGetLoading } = useGetRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateRestaurant();

  const { orders, isLoading: isGetRestaurantOrderLoading } =
    useGetRestaurantOrder();

  const isEditing = !!restaurant;

  if (isGetLoading) return <LoadingPage />;
  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Thông tin quán</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 pg-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">Hiện có {orders?.length} đơn hàng</h2>
        {orders?.map((order) => (
          <OrderItemCart order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading || isGetRestaurantOrderLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
