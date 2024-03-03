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

const formSchema = z.object({
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
  imageFile: z.instanceof(File, { message: "Hãy thêm vào ảnh" }),
});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onsave(): (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onsave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  const onSubmit = (formDataJson: restaurantFormData) => {
    // TODO - convert formDataJson to a new FormData object
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Lưu thay đổi</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
