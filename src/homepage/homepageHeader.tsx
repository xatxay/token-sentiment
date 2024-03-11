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
    <div className="w-full flex flex-row box-border items-center justify-around my-4">
      <div className="flex space-x-2 items-center justify-center">
        <img
          className="lg:w-12 max-w-6 h-auto"
          src={logo}
          alt="token sentiment logo"
        />
        <h2 className="text-xs md:text-2xl">Token Sentiment</h2>
      </div>
      <ul className="list-none flex items-center justify-center box-border">
        {menuItems.map((item) => {
          const path = `/${item.toLowerCase()}`;
          const isActive = location.pathname === path;
          return (
            <li key={item} className="no-underline lg:p-5 p-1">
              <span
                className={`md:text-xl text-sm relative overflow-hidden cursor-pointer hover:text-gray-600 ${
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
        className="text-white z-10 hover:text-gray-600 cursor-pointer underline md:text-xl text-sm"
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
