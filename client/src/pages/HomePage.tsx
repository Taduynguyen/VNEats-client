import mylanding from "../assets/mylanding.png";

import appDownload from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValue: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValue.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white py-8 rounded-lg shadow-md flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Hế lô mai fen
        </h1>
        <span className="text-xl">Chỉ một ngón tay, đồ ăn đến ngay</span>
        <SearchBar
          placeHolder="Tìm kiếm thành phố hoặc món ănh"
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <img src={mylanding} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Đặt món nhanh hơn với VNEats App
          </span>
          <span>
            Tải ứng dụng VNEats để đặt hàng nhanh hơn và nhận các gợi ý phù hợp
            cho bạn!
          </span>
          <img src={appDownload} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
