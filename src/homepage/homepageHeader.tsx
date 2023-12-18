import { useNavigate } from "react-router-dom";
import {
  HeaderContainer,
  HeaderMenu,
  HeaderText,
  LogoImage,
  LogoutButton,
  MenuItems,
  MenuList,
} from "./homepageStyle";
import logo from "./logo.png";

const HomepageHeader = () => {
  const menuItems = ["Twitter", "Youtube", "Tiktok", "Reddit", "Polls"];
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderText>
        <LogoImage src={logo} />
        Token Sentiment
      </HeaderText>
      <HeaderMenu>
        {menuItems.map((item) => {
          return (
            <MenuList key={item}>
              <MenuItems onClick={() => navigate(`/${item.toLowerCase()}`)}>
                {item}
              </MenuItems>
            </MenuList>
          );
        })}
      </HeaderMenu>
      <LogoutButton>Logout</LogoutButton>
    </HeaderContainer>
  );
};

export default HomepageHeader;
