import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";
import { LoginProps } from "../utils/interface";

const HomepageHeader = ({ setIsAuthenticated }: LoginProps) => {
  const menuItems = ["YouTube", "Twitter", "Tiktok", "Reddit"];
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="w-full flex flex-row box-border items-center justify-around">
      <img
        className="cursor-pointer w-9 ml-5"
        src={logo}
        alt="token sentiment logo"
      />
      <ul className="list-none flex items-center justify-center box-border w-full">
        {menuItems.map((item) => {
          const path = `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;
          return (
            <li key={item} className="no-underline p-5">
              <span
                className={`text-xl relative overflow-hidden cursor-pointer hover:text-gray-600 ${
                  isActive ? "text-white" : "text-gray-400"
                }`}
                onClick={() => navigate(path)}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
      <span
        className="text-white z-10 hover:text-gray-600 cursor-pointer underline mr-7 text-xl"
        onClick={handleLogout}
      >
        Logout
      </span>
    </div>
  );
};

export default HomepageHeader;

/*
return (
    <HeaderContainer>
      <LogoImage src={logo} />
      <HeaderMenu>
        {menuItems.map((item) => {
          const path = `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;
          return (
            <MenuList key={item}>
              <MenuItems onClick={() => navigate(path)} isActive={isActive}>
                {item}
              </MenuItems>
            </MenuList>
          );
        })}
      </HeaderMenu>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </HeaderContainer>
  );*/
