import { useSearchOtherRestaurant } from "@/api/OtherRestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { results } = useSearchOtherRestaurant(city);

  return (
    <span>
      Từ khóa tìm kiếm "{city}"
      <span>
        {results?.data.map((restaurant) => (
          <span>
            Tìm thấy - {restaurant.restaurantName}, {restaurant.city}
          </span>
        ))}
      </span>
    </span>
  );
};

export default SearchPage;
