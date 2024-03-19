import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order/status" className="font-bold hover:text-orange-500">
            Theo dõi đơn hàng
          </Link>
          <UserNameMenu />
        </>
      ) : (
        <Button
          onClick={async () => await loginWithRedirect()}
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
        >
          Đăng nhập
        </Button>
      )}
    </span>
  );
};

export default MainNav;
