import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "Vui lòng nhập vào tên nhà hàng",
    }),
    city: z.string({
      required_error: "Vui lòng nhập vào thành phố",
    }),
    country: z.string({
      required_error: "Vui lòng nhập vào tỉnh",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "Vui lòng nhập vào phí giao hàng",
      invalid_type_error: "Hãy nhập vào một số",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Vui lòng nhập vào thời gian giao hàng",
      invalid_type_error: "Hãy nhập vào một số",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "Vui lòng chọn ít nhất 1 lĩnh vực",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "Vui lòng nhập vào tên món"),
        price: z.coerce.number({
          required_error: "Vui lòng nhập vào thời giá",
          invalid_type_error: "Hãy nhập vào một số",
        }),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Hãy thêm vào ảnh" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Hãy thêm vào đường dẫn ảnh hoặc file ảnh",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  useEffect(() => {
    if (!restaurant) return;

    form.reset(restaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((item, index) => {
      formData.append(`menuItems[${index}][name]`, item.name);
      formData.append(`menuItems[${index}][price]`, item.price.toString());
    });

    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }
    onSave(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Lưu thay đổi</Button>
        )}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
