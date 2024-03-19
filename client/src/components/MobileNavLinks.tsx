import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/order/status"
        className="flex bg-white items-center font-bsold hover:text-orange-500"
      >
        Theo dõi đơn hàng
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-white items-center font-bsold hover:text-orange-500"
      >
        Thông tin quán
      </Link>
      <Link
        to="/user/profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Thông tin cá nhân
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Đăng xuất
      </Button>
    </>
  );
};

export default MobileNavLinks;
