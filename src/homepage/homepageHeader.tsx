import { useNavigate, useLocation } from "react-router-dom";
import {
  HeaderContainer,
  HeaderMenu,
  LogoImage,
  LogoutButton,
  MenuItems,
  MenuList,
} from "./homepageStyle";
import logo from "./logo.png";
import { LoginProps } from "../utils/interface";

const HomepageHeader = ({ setIsAuthenticated }: LoginProps) => {
  const menuItems = ["Twitter", "Youtube", "Tiktok", "Reddit", "Polls"];
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

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
  );
};

export default HomepageHeader;
